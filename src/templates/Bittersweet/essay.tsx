import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import * as React from 'react'

import Layout from '../../components/Bittersweet/layout'
import Highlight from '../../components/highlight'
import Img from '../../components/img'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo'
import * as styles from '../2645lab/post.module.styl'

import * as styles2 from './essay.module.styl'

export default class extends React.Component<any> {
  public render () {
    const { essay, site } = this.props.data
    const disqusConfig = {
      identifier: `Bittersweet/essays/${essay.strapiId}`,
      title: 'Bittersweet 随笔',
      url: `${site.siteMetadata.siteUrl + this.props.location.pathname}`
    }
    let excerpt = essay.content.substr(0, 300)
    if (excerpt !== essay.content) excerpt += '...'
    return (
      <Layout>
        <SEO
          author={essay.author.name}
          description={excerpt}
          cover={essay.childFile || ''}
          publishedTime={new Date(essay.publish_at).toISOString()}
          title="随笔"
        />
        <article>
          <h1 className={styles2.header}>随笔</h1>
          <div className={styles.post}>
            <header>
              {essay.childFile
                ? <Img
                  src={essay.childFile.url}
                  alt="cover"
                />
                : ''}
            </header>
            <Highlight text={essay.content} />
          </div>
        </article>
        <div>
          <Disqus className={styles.disqus} config={disqusConfig} />
          <ScrollToTop />
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query($id: String!) {
    essay(strapiId: { eq: $id }) {
      strapiId
      author {
        name
        avatar
      }
      content
      publish_at
      childFile {
        url
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
