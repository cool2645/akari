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

const Layout = ({ children }: any) => (
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
          style={{
            margin: '0 auto',
            maxWidth: 800,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with{' '}
            <a target="__blank" href="https://www.gatsbyjs.org">Gatsby</a> and{' '}
            <a target="__blank" href="https://strapi.io/">Strapi</a>,
            Theme <a target="__blank" href="https://github.com/cool2645/akari">Akari</a>
            <br />
            来和梨子签订契约，成为<Button text="魔法少女" background="#f4c900" />吧！
          </footer>
        </div>
      </>
    )}
  />
)

export default Layout
