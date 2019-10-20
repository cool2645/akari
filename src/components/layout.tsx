import * as React from 'react'

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
      this.state = {
        nightMode:
        // tslint:disable-next-line: strict-type-predicates
          typeof localStorage !== 'undefined'
            ? localStorage.getItem('nightMode') === 'true'
            : false
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
