import { graphql } from 'gatsby'
import * as React from 'react'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

export default ({ data }: any) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <h4>{data.allPost.totalCount} Posts</h4>
      {data.allPost.nodes.map((node: any) => (
        <div key={node.slug}>
          <h3>
            {node.title} <span>— {node.publish_at}</span>
          </h3>
          <p>{node.childMdx.excerpt}</p>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allPost(
      filter: { is_public: { eq: true }, category: { slug: { eq: "2645lab" } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        category {
          slug
        }
        title
        slug
        childMdx {
          excerpt
        }
        author {
          avatar
          name
        }
        publish_at
        is_repost
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        perPage
      }
      totalCount
    }
  }
`
