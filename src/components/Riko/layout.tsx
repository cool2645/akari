import * as React from 'react'

import Footer from '../footer'
import withNightMode, { NightModeProps } from '../layout'

import * as styles from './layout.module.styl'
import Nav from './nav'

export interface LayoutProps {
  className?: string
}

class Layout extends React.Component<LayoutProps & NightModeProps> {
  private navProps = {
    href: '/Riko/',
    links: [{
      href: '/Riko/about/',
      title: '关于梨子'
    }, {
      href: '/Riko/friends/',
      title: '友情链接'
    }, {
      href: '/Riko/',
      title: '最近动态'
    }, {
      href: '/',
      title: '博客文章'
    }],
    title: '梨园'
  }

  public render () {
    const { children } = this.props

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <Nav {...this.navProps} />
        <div
          className={`${styles.page}`}
        >
          <main className={styles.main}>{children}</main>
          <Footer
            nightMode={this.props.nightMode}
            onNightModeToggled={this.props.onNightModeToggled}
            onFontToggled={this.props.onFontToggled}
          />
        </div>
      </div>
    )
  }
}

export default withNightMode<LayoutProps>(Layout)
