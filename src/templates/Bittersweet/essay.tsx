import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Disqus } from 'gatsby-plugin-disqus'
import * as React from 'react'

import Layout from '../../components/Bittersweet/layout'
import Highlight from '../../components/highlight'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo'
import styles from '../2645lab/post.module.styl'

import styles2 from './essay.module.styl'

export default class extends React.Component<any> {

  public render () {
    const { essay, site } = this.props.data
    const disqusConfig = {
      identifier: `Bittersweet/essays/${essay.strapiId}`,
      title: '随笔',
      url: `${site.siteMetadata.siteUrl + this.props.location.pathname}`
    }
    let excerpt = essay.content.substr(0, 300)
    if (excerpt !== essay.content) excerpt += '...'
    return (
      <Layout>
        <SEO title="随笔" siteTitle="曜の船" description={excerpt} />
        <h1 className={styles2.header}>随笔</h1>
        <div className={styles.post}>
          {essay.childFile ?
            <Img
              style={{
                margin: '0 auto',
                width: essay.childFile.childImageSharp.fluid.aspectRatio * 400
              }}
              fluid={essay.childFile.childImageSharp.fluid}
              imgStyle={{ objectFit: 'contain' }}
            /> : ''}
          <Highlight text={essay.content} />
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
        childImageSharp {
          fluid {
            aspectRatio
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`