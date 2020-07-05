import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/Riko/layout'
import Status from '../../components/Riko/status'
import SEO from '../../components/seo'

export default ({ data }: any) => (
  <Layout>
    <SEO title="最近动态" siteTitle="梨园" description="这只梨子最近在哪自闭呢？" />
    <Status data={data} />
  </Layout>
)

export const query = graphql`
  query {
    allStatus(
      filter: { author: { name: { eq: "梨子" } } }
      sort: { order: DESC, fields: publish_at }
      limit: 100
    ) {
      nodes {
        type
        publish_at
        full_text
        retweeted_status {
          full_text
          user {
            screen_name
            name
          }
        }
        id_str
        url
        source
        childFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        category {
          slug
        }
        title
        slug
        childMdx {
          excerpt(pruneLength: 300, truncate: true)
        }
        is_repost
      }
    }
  }
`
