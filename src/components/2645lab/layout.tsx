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
import withNightMode, { NightModeProps } from '../layout'

import Header from './header'
import * as styles from './layout.module.styl'

class Layout extends React.Component<NightModeProps> {
  @autobind
  public staticQueryRender (data: any) {
    const { children } = this.props
    return (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
        />
        <div
          className={`${styles.layout}`}
        >
          <main>{children}</main>
          <Footer
            nightMode={this.props.nightMode}
            onNightModeToggled={this.props.onNightModeToggled}
            onFontToggled={this.props.onFontToggled}
          />
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
}

export default withNightMode<{}>(Layout)
