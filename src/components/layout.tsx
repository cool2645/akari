import * as React from 'react'

import './layout.css'

export interface NightModeProps {
  nightMode: boolean
  onNightModeToggled: (nightMode: boolean) => void
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
      const systemPreferNightMode = typeof window !== 'undefined'
        && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      this.state = {
        nightMode:
          // tslint:disable-next-line: strict-type-predicates
          typeof localStorage !== 'undefined'
            ? localStorage.getItem('nightMode') === 'true' || systemPreferNightMode
            : systemPreferNightMode
      }
      this.onToggledNightMode = this.onToggledNightMode.bind(this)
    }

    public render () {
      return (
        <LayoutComponent
          {...this.props}
          nightMode={this.state.nightMode}
          onNightModeToggled={this.onToggledNightMode}
        />
      )
    }

    private onToggledNightMode (nightMode: boolean) {
      this.setState({
        nightMode
      })
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

        document.body.className = nightMode ? 'nightly' : ''

        // tslint:disable-next-line: strict-type-predicates
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('nightMode', nightMode + '')
        }
      }

      if (this.props.onNightModeToggled) {
        this.props.onNightModeToggled(nightMode)
      }
    }
  }

}
