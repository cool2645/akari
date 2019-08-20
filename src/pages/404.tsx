import * as React from 'react'

import autobind from 'autobind-decorator'
import Layout from '../components/2645lab/layout'
import SEO from '../components/seo'
import styles from './404.module.styl'

interface NotFoundPageState {
  hitokoto: string
  from: string
  loading: boolean
}

export default class extends React.Component<{}, NotFoundPageState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      hitokoto: '这是个假地址，我们上当了',
      from: '[法]雨果《悲惨世界》,刘佳婷译,吉林大学出版社2008.10,110页',
      loading: false,
    }
  }

  public render() {
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
  private getHitokoto(e: React.MouseEvent) {
    e.preventDefault()
    if (this.state.loading) return
    this.setState(
      {
        loading: true,
      },
      () =>
        fetch('https://v1.hitokoto.cn/?c=a')
          .then(res => res.json())
          .then(data => {
            if (data.hitokoto) {
              this.setState({
                hitokoto: data.hitokoto,
                from: data.from,
                loading: false,
              })
            } else throw new Error(JSON.stringify(data))
          })
          .catch((err: Error) => {
            this.setState({
              hitokoto: err.message,
              from: err.stack
                ? err.stack.toString()
                : `getHitokoto/</<@${window.location.origin}/commons.js:86391:15`,
              loading: false,
            })
          })
    )
  }
}
