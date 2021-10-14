import * as React from 'react'

import KokoroProvider from './kokoro-provider'
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
    kokoroPlayerRef = React.createRef()

    constructor (props: any) {
      super(props)
      // tslint:disable-next-line: strict-type-predicates
      const systemPreferNightMode = typeof window !== 'undefined' &&
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      // tslint:disable-next-line: strict-type-predicates
      const persistentNightMode = typeof localStorage !== 'undefined'
        ? localStorage.getItem('nightMode') === 'true' || systemPreferNightMode
        : systemPreferNightMode
      this.state = {
        // tslint:disable-next-line: strict-type-predicates
        nightMode: (typeof window !== 'undefined' && window.akari.nightMode) ?? persistentNightMode
      }
      this.onToggledNightMode = this.onToggledNightMode.bind(this)
      this.onToggledFont = this.onToggledFont.bind(this)
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
          <KokoroProvider>
            <kokoro-player
              ref={this.kokoroPlayerRef}
              lang="zh_Hans"
              top="100"
              left="0"
              mobileDefaultSide="right"
            >{}
            </kokoro-player>
          </KokoroProvider>
        </>
      )
    }

    onToggledNightMode (nightMode: boolean) {
      this.setState({
        nightMode
      })
      if (this.kokoroPlayerRef.current) {
        (this.kokoroPlayerRef.current as any).darkMode = nightMode
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
          document.body.classList.add('nightly')
          document.body.classList.remove('daily')
        } else {
          document.body.classList.remove('nightly')
          document.body.classList.add('daily')
        }
        window.akari.nightMode = nightMode
        window.localStorage.setItem('nightMode', nightMode + '')
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
