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
      if (this.props.onNightModeToggled) {
        this.props.onNightModeToggled(nightMode)
      }
    }
  }

}
