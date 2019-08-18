import * as React from 'react'

import Layout from '../components/2645lab/layout'
import SEO from '../components/seo'

interface NotFoundPageState {
  hitokoto: string
}

export default class extends React.Component<{}, NotFoundPageState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      hitokoto: '',
    }
  }

  public componentDidMount() {
    this.getHitokoto()
  }

  public render() {
    return (
      <Layout>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>{this.state.hitokoto}</p>
      </Layout>
    )
  }

  private getHitokoto() {
    fetch('https://v1.hitokoto.cn/?c=a')
      .then(res => res.json())
      .then(data => {
        if (data.hitokoto) {
          this.setState({
            hitokoto: data.hitokoto,
          })
        } else throw data
      })
      .catch(() => {
        this.setState({
          hitokoto: '网页咕咕咕了',
        })
      })
  }
}
