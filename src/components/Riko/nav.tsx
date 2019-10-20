import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import autobind from 'autobind-decorator'
import { Link } from 'gatsby'
import * as React from 'react'

import styles from './nav.module.styl'

export interface NavProps {
  title: string
  href: string
  links: Array<{
    title: string
    href: string
  }>
}

interface NavState {
  mobileShowSideBar: boolean
}

export default class extends React.Component<NavProps, NavState> {

  constructor (props: NavProps) {
    super(props)
    this.state = {
      mobileShowSideBar: false
    }
  }

  public componentWillUnmount () {
    // tslint:disable-next-line
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto'
    }
  }

  public render () {
    return (
      <nav className={styles.placeholder}>
        <div className={styles.titleBar}>
          <a href="" onClick={this.toggleNavBar} className={styles.title}>
            <span><FontAwesomeIcon icon={faBars} size="sm" /></span>
            <h1>
              {this.props.title}
            </h1>
          </a>
        </div>
        <div
          className={`${styles.underlay} ${this.state.mobileShowSideBar ? styles.show : ''}`}
          onClick={this.toggleNavBar}
        />
        <div className={`${styles.sideBar} ${this.state.mobileShowSideBar ? styles.show : ''}`}>
          <div className={styles.header}>
            <div className={styles.banner}>
              <Link to={this.props.href}>
                <h1>
                  {this.props.title}
                </h1>
              </Link>
            </div>
            <div className={styles.links}>
              <ul>
                {
                  this.props.links.map((link) => (
                    <Link key={link.href} to={link.href} activeClassName={styles.active}>
                      <li>{link.title}</li>
                    </Link>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  @autobind
  private toggleNavBar (e: React.MouseEvent) {
    e.preventDefault()
    this.setState({
      mobileShowSideBar: !this.state.mobileShowSideBar
    }, () => {
      // tslint:disable-next-line
      if (typeof document !== 'undefined') {
        document.body.style.overflow =
          this.state.mobileShowSideBar ? 'hidden' : 'auto'
      }
    })
  }
}
