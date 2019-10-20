import * as React from 'react'

import Footer from '../footer'
import withNightMode, { NightModeProps } from '../layout'
import '../layout.css'
import Nav, { NavProps } from '../Riko/nav'

import styles from './layout.module.styl'

export interface LayoutProps {
  navProps: NavProps,
  className?: string
}

class Layout extends React.Component<LayoutProps & NightModeProps> {
  public render () {
    const { children } = this.props

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        <Nav {...this.props.navProps} />
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
