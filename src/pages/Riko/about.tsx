import { MDXProvider } from '@mdx-js/react'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'

import Alert from '../../components/alert'
import Hr from '../../components/hr'
import Layout from '../../components/Riko/layout'
import ScrollToTop from '../../components/scroll-to-top'
import SEO from '../../components/seo'
import * as styles from '../../templates/2645lab/post.module.styl'

export default ({ data, location }: any) => {
  const disqusConfig = {
    identifier: data.post.slug,
    title: data.post.title,
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`
  }
  return (
    <Layout>
      <SEO title="关于梨子" siteTitle="梨园" description="梨子梨子梨" />
      <h1>{data.post.title}</h1>
      <div className={styles.post}>
        <MDXProvider
          components={{
            alert: Alert,
            hr: Hr
          }}
        >
          <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
        </MDXProvider>
        <Alert
          content="和文章无关的留言就写在这里吧~"
          level="info"
        />
        <Disqus className={styles.disqus} config={disqusConfig} />
        <ScrollToTop />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    post: post(slug: { eq: "about-riko" }) {
      childMdx {
        headings {
          depth
          value
        }
        body
      }
      publish_at
      update_at
      slug
      title
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
