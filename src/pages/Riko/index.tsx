import * as React from 'react'

import { graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Layout from '../../components/Riko/layout'
import PostCard from '../../components/Riko/post-card'
import TwitterCard from '../../components/Riko/twitter-card'
import ScrollToTop from '../../components/scroll-to-top';
import styles from './index.module.styl'

import Hr from '../../components/hr'

export default ({ data }: any) => (
  <Layout>
    <div className={styles.container}>
      <h1>最近动态</h1>
      <Masonry
        updateOnEachImageLoad={true}
      >
        {
          data.allStatus.nodes.map((node: any) => (
            <div key={node.slug || node.id_str}
                 className={styles.statusCard}
            >
              {
                node.type === 'twitter' ?
                  <TwitterCard
                    time={node.publish_at}
                    full_text={node.full_text}
                    url={`https://twitter.com/rikorikorilove/status/${node.id_str}`}
                    extended_entities={node.extended_entities}
                    source={node.source}
                    retweeted_status={node.retweeted_status}
                  />
                  : <PostCard
                    time={node.publish_at}
                    title={node.title}
                    excerpt={node.childMdx.excerpt}
                    slug={node.slug}
                  />
              }
            </div>
          ))
        }
      </Masonry>
      <Hr content="到底了" />
      <ScrollToTop />
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allStatus(
      filter: { author: { name: { eq: "梨子" } } }
      sort: { order: DESC, fields: publish_at }
    ) {
      nodes {
        type
        full_text
        retweeted_status {
          full_text
          extended_entities {
            media {
              media_url_https
            }
          }
          source
          favorite_count
          retweet_count
          user {
            screen_name
            name
            profile_image_url_https
          }
        }
        id_str
        extended_entities {
          media {
            media_url_https
          }
        }
        source
        retweet_count
        favorite_count
        category {
          slug
        }
        title
        slug
        childMdx {
          excerpt(pruneLength: 300)
        }
        author {
          avatar
          name
          email
        }
        publish_at
        is_repost
      }
    }
  }
`
