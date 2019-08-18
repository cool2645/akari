/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import * as React from 'react'

import Button from '../button'
import '../layout.css'
import Nav from './nav'

import autobind from 'autobind-decorator'
import styles from './layout.module.styl'

export interface LayoutProps {
  onNightModeToggled?: (nightMode: boolean) => void
}

interface LayoutState {
  nightMode: boolean
}

export default class extends React.Component<LayoutProps, LayoutState> {

  constructor(props: any) {
    super(props)
    this.state = {
      // tslint:disable-next-line: strict-type-predicates
      nightMode: typeof localStorage !== 'undefined'
        ? localStorage.getItem('nightMode') === 'true' : false,
    }
    this.onToggledNightMode()
  }

  public render() {
    const { children } = this.props

    return (
      <div className={styles.container}>
        <Nav />
        <div
          className={`${styles.page}
                 ${this.state.nightMode ? styles.nightMode : ''}`}
        >
          <main className={styles.main}>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with{' '}
            <a target="__blank" href="https://www.gatsbyjs.org">Gatsby</a> and{' '}
            <a target="__blank" href="https://strapi.io/">Strapi</a>,
            Theme <a target="__blank" href="https://github.com/cool2645/akari" className={styles.theme}>
            {this.state.nightMode ? <span className={styles.hoshi}>Hoshi</span> : ''}<span>Akari</span>
          </a>
            <br />
            来和梨子签订契约，成为<Button text="魔法少女" background="#f4c900"
                               onClick={this.toggleNightMode} />吧！
          </footer>
        </div>
      </div>
    )
  }

  @autobind
  private toggleNightMode() {
    this.setState({
      nightMode: !this.state.nightMode,
    }, this.onToggledNightMode)
  }

  @autobind
  private onToggledNightMode() {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof document !== 'undefined') {
      document.body.className = this.state.nightMode ? 'nightly' : ''

      if (this.props.onNightModeToggled) {
        this.props.onNightModeToggled(this.state.nightMode)
      }

      // tslint:disable-next-line: strict-type-predicates
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('nightMode', this.state.nightMode + '')
      }
    }
  }
}
