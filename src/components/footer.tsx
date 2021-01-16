import autobind from 'autobind-decorator'
import * as React from 'react'

import Button from './button'
import styles from './Riko/layout.module.styl'

export interface FooterProps {
  nightMode: boolean
  onNightModeToggled: (nightMode: boolean) => void
}

export default class extends React.Component<FooterProps, {}> {
  constructor (props: any) {
    super(props)
    // 控制台打印日志，不是非常必要，留到下一个宏任务
    setTimeout(() => this.props.onNightModeToggled(this.props.nightMode))
  }

  public render () {
    return (
      <footer>
        © 2016 - {new Date().getFullYear()}, Built with{' '}
        <a target="__blank" href="https://www.gatsbyjs.org">
          Gatsby
        </a>{' '}
        &{' '}
        <a target="__blank" href="https://strapi.io/">
          Strapi
        </a>
        , Theme{' '}
        <a
          target="__blank"
          href="https://github.com/cool2645/akari"
          className={styles.theme}
        >
          {this.props.nightMode ? (
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
          background={this.props.nightMode ? '#ee8e00' : '#f4c900'}
          onClick={this.toggleNightMode}
        />
        吧！
      </footer>
    )
  }

  @autobind
  private toggleNightMode () {
    this.props.onNightModeToggled(!this.props.nightMode)
  }

}
