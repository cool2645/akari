import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/Riko/layout'
import Status from '../../components/Riko/status'
import SEO from '../../components/seo'

import { navProps } from './nav'

export default ({ data }: any) => (
  <Layout navProps={navProps}>
    <SEO title="最近动态" siteTitle={navProps.title} description="这只梨子最近在哪自闭呢？" />
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
          excerpt(pruneLength: 300)
        }
        is_repost
      }
    }
  }
`
