import { graphql } from 'gatsby'
import * as React from 'react'

import Friends from '../../components/Riko/friends'
import Layout from '../../components/Riko/layout'
import SEO from '../../components/seo'

import { navProps } from './nav'
import styles from './theme.module.styl'

export default ({ data, location }: any) => {
  const disqusConfig = {
    identifier: data.post.slug,
    title: data.post.title,
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`
  }
  return (
    <Layout navProps={navProps} className={styles.themeColor}>
      <SEO title="友情链接" siteTitle={navProps.title} description="和 BS 成为好朋友吧！" />
      <Friends post={data.post} disqusConfig={disqusConfig} />
    </Layout>
  )
}

export const query = graphql`
  query {
    post: post(slug: { eq: "bittersweet-friends" }) {
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
