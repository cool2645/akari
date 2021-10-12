import * as React from 'react'

import Footer from '../footer'
import withNightMode, { NightModeProps } from '../layout'
import Nav from '../Riko/nav'

import * as styles from './layout.module.styl'

class Layout extends React.Component<NightModeProps> {
  private navProps = {
    href: '/Bittersweet/',
    links: [{
      href: '/Bittersweet/about/',
      title: '关于 BS'
    }, {
      href: '/Bittersweet/friends/',
      title: '友情链接'
    }, {
      href: '/Bittersweet/',
      title: '最近动态'
    }, {
      href: '/',
      title: '博客文章'
    }],
    title: '曜の船'
  }

  public render () {
    const { children } = this.props

    return (
      <div className={`${styles.container} ${styles.themeColor}`}>
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

export default withNightMode<{}>(Layout)
