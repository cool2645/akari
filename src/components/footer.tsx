import autobind from 'autobind-decorator'
import * as React from 'react'

import Button from './button'
import * as styles2 from './footer.module.styl'
import * as styles from './Riko/layout.module.styl'

export interface FooterProps {
  nightMode: boolean
  onNightModeToggled: (nightMode: boolean) => void
  onFontToggled: (fontFace: string) => void
}

export default class extends React.Component<FooterProps, {}> {
  public render () {
    return (
      <footer>
        <div className={styles2.row}>
          <div className={styles2.rss}>
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
              {this.props.nightMode
                ? (
                    <span className={styles.hoshi}>Hoshi</span>
                  )
                : (
                    ''
                  )}
              <span>Akari</span>
            </a>
          </div>
        </div>
        <div className={styles2.row}>
          <div>
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
          </div>
          <div>
            字体偏好：
            <a href="" className={styles2.font} onClick={this.setFontFaceSerif}
            >宋体</a> / <a href="" className={styles2.font} onClick={this.setFontFaceSansSerif}
          >黑体</a> / <a href="" className={styles2.font} onClick={this.setFontFaceLxgw}
          >霞鹜文楷</a>
          </div>
        </div>
        <br />
      </footer>
    )
  }

  @autobind
  private toggleNightMode () {
    this.props.onNightModeToggled(!this.props.nightMode)
  }

  @autobind
  private setFontFaceSerif (e: React.MouseEvent) {
    e.preventDefault()
    this.props.onFontToggled('serif')
  }

  @autobind
  private setFontFaceSansSerif (e: React.MouseEvent) {
    e.preventDefault()
    this.props.onFontToggled('sans-serif')
  }

  @autobind
  private setFontFaceLxgw (e: React.MouseEvent) {
    e.preventDefault()
    this.props.onFontToggled('lxgw')
  }
}
