import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/Bittersweet/layout'
import Status from '../../components/Riko/status'
import SEO from '../../components/seo'

export default ({ data }: any) => (
  <Layout>
    <SEO title="最近动态" siteTitle="曜の船" description="这只 BS 最近在哪自闭呢？" />
    <Status data={data} />
  </Layout>
)

export const query = graphql`
  query {
    allStatus(
      filter: { author: { name: { eq: "Bittersweet" } } }
      sort: { order: DESC, fields: publish_at }
      limit: 100
    ) {
      nodes {
        type
        publish_at
        childFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        id
        strapiId
        url
        category {
          slug
          name
        }
        content
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
