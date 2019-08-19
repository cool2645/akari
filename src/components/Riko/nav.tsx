import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// tslint:disable-next-line:no-implicit-dependencies
import { globalHistory } from '@reach/router'
import autobind from 'autobind-decorator'
import { Link } from 'gatsby'
import * as React from 'react'
import styles from './nav.module.styl'

interface NavState {
  mobileShowSideBar: boolean
}

export default class extends React.Component<{}, NavState> {

  constructor(props: {}) {
    super(props)
    this.state = {
      mobileShowSideBar: false
    }
  }

  public render() {
    return (
      <nav className={styles.placeholder}>
        <div className={styles.titleBar}>
          <a href="" onClick={this.toggleNavBar} className={styles.title}>
            <span><FontAwesomeIcon icon={faBars} size="sm" /></span>
            <h1>
              梨园
            </h1>
          </a>
        </div>
        <div className={`${styles.underlay} ${this.state.mobileShowSideBar ? styles.show : ''}`}
             onClick={this.toggleNavBar}
        />
        <div className={`${styles.sideBar} ${this.state.mobileShowSideBar ? styles.show : ''}`}>
          <div className={styles.header}>
            <div className={styles.banner}>
              <Link to="/Riko">
                <h1>
                  梨园
                </h1>
              </Link>
            </div>
            <div className={styles.links}>
              <ul>
                <Link to="/Riko/about">
                  <li className={
                    globalHistory.location.pathname === '/Riko/about' ? styles.active : ''
                  }>关于梨子
                  </li>
                </Link>
                <Link to="/Riko/friends">
                  <li className={
                    globalHistory.location.pathname === '/Riko/friends' ? styles.active : ''
                  }>友情链接
                  </li>
                </Link>
                <Link to="/Riko">
                  <li className={
                    globalHistory.location.pathname === '/Riko' ? styles.active : ''
                  }>最近动态
                  </li>
                </Link>
                <Link to="/">
                  <li>技术文章</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  @autobind
  private toggleNavBar(e: React.MouseEvent) {
    e.preventDefault()
    this.setState({
      mobileShowSideBar: !this.state.mobileShowSideBar
    }, () => {
      // tslint:disable-next-line
      if (typeof document !== 'undefined') {
        document.body.style.overflow =
          this.state.mobileShowSideBar ? 'hidden' : 'auto';
      }
    })
  }
}
