import autobind from 'autobind-decorator'
import * as React from 'react'

import Layout from '../components/2645lab/layout'
import SEO from '../components/seo'

import styles from './404.module.styl'

interface NotFoundPageState {
  hitokoto: string
  from: string
  loading: boolean
}

export default class extends React.Component<{}, NotFoundPageState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      from: '[法]雨果《悲惨世界》,刘佳婷译,吉林大学出版社2008.10,110页',
      hitokoto: '这是个假地址，我们上当了',
      loading: false
    }
  }

  public render () {
    return (
      <Layout>
        <SEO title="404: Not found" />
        <blockquote className={styles.blockquote}>
          {this.state.hitokoto}
        </blockquote>
        <p className={`${styles.p} ${styles.from}`}>
          <span>{this.state.from}</span>
        </p>
        <p className={styles.p}>
          <a href="" onClick={this.getHitokoto}>
            {this.state.loading ? '加载中...' : '换一句'}
          </a>
        </p>
      </Layout>
    )
  }

  @autobind
  private getHitokoto (e: React.MouseEvent) {
    e.preventDefault()
    if (this.state.loading) return
    this.setState(
      {
        loading: true
      },
      () =>
        window.fetch('https://v1.hitokoto.cn/?c=a')
          .then((res) => res.json())
          .then((data) => {
            if (data.hitokoto) {
              this.setState({
                from: data.from,
                hitokoto: data.hitokoto,
                loading: false
              })
            } else throw new Error(JSON.stringify(data))
          })
          .catch((err: Error) => {
            this.setState({
              from: err.stack
                ? err.stack.toString()
                : `getHitokoto/</<@${window.location.origin}/commons.js:86391:15`,
              hitokoto: err.message,
              loading: false
            })
          })
    )
  }
}
