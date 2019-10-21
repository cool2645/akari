import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/Bittersweet/layout'
import Friends from '../../components/Riko/friends'
import SEO from '../../components/seo'

export default ({ data, location }: any) => {
  const disqusConfig = {
    identifier: data.post.slug,
    title: data.post.title,
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`
  }
  return (
    <Layout>
      <SEO title="友情链接" siteTitle="曜の船" description="和 BS 成为好朋友吧！" />
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
