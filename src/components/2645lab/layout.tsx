/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import autobind from 'autobind-decorator'
import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'

import Footer from '../footer'
import '../layout.css'

import Header from './header'
import styles from './layout.module.styl'

export interface LayoutProps {
  onNightModeToggled?: (nightMode: boolean) => void
}

interface LayoutState {
  nightMode: boolean
}

export default class extends React.Component<LayoutProps, LayoutState> {

  constructor (props: any) {
    super(props)
    this.state = {
      nightMode:
      // tslint:disable-next-line: strict-type-predicates
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('nightMode') === 'true'
          : false
    }
  }

  @autobind
  public staticQueryRender (data: any) {
    const { children } = this.props
    return (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
        />
        <div
          className={`${styles.layout}
               ${this.state.nightMode ? styles.nightMode : ''}`}
        >
          <main>{children}</main>
          <Footer onNightModeToggled={this.onToggledNightMode} />
        </div>
      </>
    )
  }

  public render () {
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
        render={this.staticQueryRender}
      />
    )
  }

  @autobind
  private onToggledNightMode (nightMode: boolean) {
    this.setState({
      nightMode
    })
    if (this.props.onNightModeToggled) {
      this.props.onNightModeToggled(nightMode)
    }
  }
}
