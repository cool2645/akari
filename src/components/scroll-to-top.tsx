import * as React from 'react'

import autobind from 'autobind-decorator'
import styles from './scroll-to-top.module.styl'

interface ScrollToTopState {
  top: boolean
}

export default class extends React.Component<{}, ScrollToTopState> {
  constructor() {
    super({})

    this.state = {
      top: true,
    }

    // tslint:disable-next-line: strict-type-predicates
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll)
    }
  }

  public componentWillUnmount() {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
    }
  }

  public render() {
    return (
      <div
        className={`${styles.scrollToTop} ${this.state.top ? styles.hide : ''}`}
        onClick={this.scrollToTop}
      />
    )
  }

  @autobind
  private onScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop <= 100) {
      this.setState({ top: true })
    } else {
      this.setState({ top: false })
    }
  }

  @autobind
  private scrollToTop() {
    let currentY = document.documentElement.scrollTop || document.body.scrollTop
    const needScrollTop = 0 - currentY
    setTimeout(() => {
      currentY += Math.ceil(needScrollTop / 10)
      window.scrollTo(0, currentY)
      if (needScrollTop > 10 || needScrollTop < -10) {
        this.scrollToTop()
      } else {
        window.scrollTo(0, 0)
      }
    }, 1)
  }
}
