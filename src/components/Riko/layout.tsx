/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import autobind from 'autobind-decorator'
import * as React from 'react'

import Footer from '../footer'
import '../layout.css'

import styles from './layout.module.styl'
import Nav from './nav'

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

  public render () {
    const { children } = this.props

    return (
      <div className={styles.container}>
        <Nav />
        <div
          className={`${styles.page}
                 ${this.state.nightMode ? styles.nightMode : ''}`}
        >
          <main className={styles.main}>{children}</main>
          <Footer onNightModeToggled={this.onToggledNightMode} />
        </div>
      </div>
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
