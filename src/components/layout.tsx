import * as React from 'react'

import './layout.css'
import './prism.styl'

export interface NightModeProps {
  nightMode: boolean
  onNightModeToggled: (nightMode: boolean) => void
  onFontToggled: (fontFace: string) => void
}

export interface OutputLayoutProps {
  onNightModeToggled?: (nightMode: boolean) => void
}

export interface LayoutState {
  nightMode: boolean
}

export default <P extends {}> (LayoutComponent: React.ComponentType<P & NightModeProps>) => {
  return class extends React.Component<P & OutputLayoutProps, LayoutState> {
    constructor (props: any) {
      super(props)
      // tslint:disable-next-line: strict-type-predicates
      const persistentNightMode = (typeof localStorage !== 'undefined' && localStorage.getItem('userNightMode'))
        ? localStorage.getItem('userNightMode') === 'true'
        : undefined
      this.state = {
        // tslint:disable-next-line: strict-type-predicates
        nightMode: persistentNightMode ?? this.systemPreferNightMode
      }
      this.onToggledNightMode = this.onToggledNightMode.bind(this)
      this.onToggledFont = this.onToggledFont.bind(this)
    }

    get systemPreferNightMode () {
      // tslint:disable-next-line: strict-type-predicates
      return typeof window !== 'undefined' &&
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    componentDidMount () {
      // tslint:disable-next-line: strict-type-predicates
      if (typeof localStorage !== 'undefined' && localStorage.getItem('font')) {
        this.onToggledFont(localStorage.getItem('font') as string)
      }
      this.onToggledNightMode(this.state.nightMode)
    }

    render () {
      return (
        <>
          <LayoutComponent
            {...this.props}
            nightMode={this.state.nightMode}
            onNightModeToggled={this.onToggledNightMode}
            onFontToggled={this.onToggledFont}
          />
        </>
      )
    }

    onToggledNightMode (nightMode: boolean) {
      this.setState({
        nightMode
      })
      if (document.querySelector('kokoro-player')) {
        // tslint:disable-next-line: no-unnecessary-type-assertion
        (document.querySelector('kokoro-player') as any).darkMode = nightMode
      }
      // tslint:disable-next-line: strict-type-predicates
      if (typeof window !== 'undefined') {
        if (!nightMode) {
          if (!window.akari.console.akari) {
            window.akari.console.akari = '"Akari" is brightness (明り)'
            // tslint:disable-next-line:no-console
            console.log(window.akari.console.akari)
          }
        } else {
          if (!window.akari.console.hoshiakari) {
            window.akari.console.hoshiakari =
              '"HoshiAkari" is starlight (星明かり)'
            // tslint:disable-next-line:no-console
            console.log(window.akari.console.hoshiakari)
          }
        }

        if (nightMode) {
          document.documentElement.classList.add('nightly')
          document.documentElement.classList.remove('daily')
        } else {
          document.documentElement.classList.remove('nightly')
          document.documentElement.classList.add('daily')
        }
        window.akari.nightMode = nightMode
        if (nightMode !== this.systemPreferNightMode) {
          window.localStorage.setItem('userNightMode', nightMode + '')
        } else {
          window.localStorage.removeItem('userNightMode')
        }
      }

      if (this.props.onNightModeToggled) {
        this.props.onNightModeToggled(nightMode)
      }
    }

    onToggledFont (fontFace: string) {
      document.body.className = document.body.className
        .split(' ')
        .filter(cn => !cn.startsWith('font'))
        .join(' ')
      document.body.classList.add(`font-${fontFace}`)
      window.localStorage.setItem('font', fontFace)
    }
  }
}
