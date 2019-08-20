/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'

import Button from '../button'
import '../layout.css'
import Header from './header'

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
      <StaticQuery
        query={graphql`
          query SiteTitleQuery2645 {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Header
              siteTitle={data.site.siteMetadata.title}
            />
            <div
              className={`${styles.layout}
               ${this.state.nightMode ? styles.nightMode : ''}`}
            >
              <main>{children}</main>
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
          </>
        )}
      />
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
      if (!this.state.nightMode) {
        if (!document.akari.console.akari) {
          document.akari.console.akari = 'Akari means brightness, 明り.'
          console.log(document.akari.console.akari)
        }
      } else {
        if (!document.akari.console.hoshiakari) {
          document.akari.console.hoshiakari = 'HoshiAkari means light of the star, 星明かり.'
          console.log(document.akari.console.hoshiakari)
        }
      }

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
