import autobind from 'autobind-decorator'
import * as React from 'react'

import Button from './button'
import styles from './Riko/layout.module.styl'

export interface FooterProps {
  onNightModeToggled?: (nightMode: boolean) => void
}

interface FooterState {
  nightMode: boolean
}

export default class extends React.Component<FooterProps, FooterState> {
  constructor (props: any) {
    super(props)
    this.state = {
      nightMode:
        // tslint:disable-next-line: strict-type-predicates
        typeof window !== 'undefined'
          ? window.localStorage.getItem('nightMode') === 'true'
          : false
    }
    this.onToggledNightMode()
  }

  public render () {
    return (
      <footer>
        © {new Date().getFullYear()}, Built with{' '}
        <a target="__blank" href="https://www.gatsbyjs.org">
          Gatsby
        </a>{' '}
        and{' '}
        <a target="__blank" href="https://strapi.io/">
          Strapi
        </a>
        , Theme{' '}
        <a
          target="__blank"
          href="https://github.com/cool2645/akari"
          className={styles.theme}
        >
          {this.state.nightMode ? (
            <span className={styles.hoshi}>Hoshi</span>
          ) : (
            ''
          )}
          <span>Akari</span>
        </a>
        <br />
        来和梨子
        <a href="/feed.xml" target="_blank">
          签订契约
        </a>
        ，成为
        <Button
          text="魔法少女"
          background="#f4c900"
          onClick={this.toggleNightMode}
        />
        吧！
      </footer>
    )
  }

  @autobind
  private toggleNightMode () {
    this.setState(
      {
        nightMode: !this.state.nightMode
      },
      this.onToggledNightMode
    )
  }

  @autobind
  private onToggledNightMode () {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof window !== 'undefined') {
      if (!this.state.nightMode) {
        if (!window.akari.console.akari) {
          window.akari.console.akari = 'Akari means brightness, 明り.'
          // tslint:disable-next-line:no-console
          console.log(window.akari.console.akari)
        }
      } else {
        if (!window.akari.console.hoshiakari) {
          window.akari.console.hoshiakari =
            'HoshiAkari means light of the star, 星明かり.'
          // tslint:disable-next-line:no-console
          console.log(window.akari.console.hoshiakari)
        }
      }

      document.body.className = this.state.nightMode ? 'nightly' : ''

      if (this.props.onNightModeToggled) {
        this.props.onNightModeToggled(this.state.nightMode)
      }

      // tslint:disable-next-line: strict-type-predicates
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('nightMode', this.state.nightMode + '')
      }
    }
  }
}
