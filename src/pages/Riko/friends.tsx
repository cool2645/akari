import { graphql } from 'gatsby'
import * as React from 'react'

import Alert from '../../components/alert'
import Friends from '../../components/Riko/friends'
import Layout from '../../components/Riko/layout'
import SEO from '../../components/seo'

export default ({ data, location }: any) => {
  const disqusConfig = {
    identifier: data.post.slug,
    title: data.post.title,
    url: `${data.site.siteMetadata.siteUrl + location.pathname}`
  }
  return (
    <Layout>
      <SEO title="友情链接" siteTitle="梨园" description="和梨子成为好朋友吧！" />
      <Friends post={data.post} disqusConfig={disqusConfig}>
        <Alert
          content="需要更新链接请留言哦~"
          level="info"
        />
      </Friends>
    </Layout>
  )
}

export const query = graphql`
  query {
    post: post(slug: { eq: "riko-friends" }) {
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
