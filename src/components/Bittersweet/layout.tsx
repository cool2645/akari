import * as React from 'react'

import Footer from '../footer'
import withNightMode, { NightModeProps } from '../layout'
import Nav from '../Riko/nav'

import styles from './layout.module.styl'

export interface LayoutProps {
  className?: string
}

class Layout extends React.Component<LayoutProps & NightModeProps> {
  private navProps = {
    href: '/Bittersweet',
    links: [{
      href: '/Bittersweet/about',
      title: '关于 BS'
    }, {
      href: '/Bittersweet/friends',
      title: '友情链接'
    }, {
      href: '/Bittersweet',
      title: '最近动态'
    }, {
      href: '/',
      title: '技术文章'
    }],
    title: '曜の船'
  }

  public render () {
    const { children } = this.props

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <Nav {...this.navProps} />
        <div
          className={`${styles.page}
                 ${this.props.nightMode ? styles.nightMode : ''}`}
        >
          <main className={styles.main}>{children}</main>
          <Footer onNightModeToggled={this.props.onNightModeToggled} />
        </div>
      </div>
    )
  }
}

export default withNightMode<LayoutProps>(Layout)
