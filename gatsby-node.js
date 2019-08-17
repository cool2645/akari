/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require(`crypto`)
const path = require(`path`)
const fs = require(`fs`)

const digest = data => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`)
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions
  if (node.internal.type === 'StrapiPost') {
    if (node.copyright_notice) {
      createNode({
        id: node.id + '-copyright-notice',
        parent: node.id + '-markdown',
        children: [],
        internal: {
          type: 'CopyrightNotice',
          mediaType: 'text/markdown',
          content: node.copyright_notice,
          contentDigest: digest(node.copyright_notice),
        },
      })
    }
    createNode({
      ...node,
      id: node.id + '-markdown',
      parent: node.id,
      children: node.copyright_notice ? [node.id + '-copyright-notice'] : [],
      internal: {
        type: 'Post',
        mediaType: 'text/markdown',
        content: node.content,
        contentDigest: digest(node),
      },
    })
  }
}

Promise.chain = function(arr) {
  return arr.reduce((p, fn) => {
    return p.then(() => fn)
  }, Promise.resolve())
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const createJSON = pageData => {
    const filePath = `public/json-data/${pageData.path}`
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const dataToSave = JSON.stringify(pageData.context)
    fs.writeFile(filePath, dataToSave, err => {
      if (err) return console.error(err)
    })
  }

  const _2645lab_index_pages = graphql(`
    query {
      allPost(limit: 10) {
        pageInfo {
          pageCount
          perPage
        }
      }
    }
  `).then(result => {
    for (let i = 1; i <= result.data.allPost.pageInfo.pageCount; i++) {
      createPage({
        path: `pages/${i}`,
        component: path.resolve(`./src/templates/2645lab/index.tsx`),
        context: {
          skip: (i - 1) * result.data.allPost.pageInfo.perPage,
          limit: result.data.allPost.pageInfo.perPage,
        },
      })
    }
    createPage({
      path: `/`,
      component: path.resolve(`./src/templates/2645lab/index.tsx`),
      context: {
        skip: 0,
        limit: result.data.allPost.pageInfo.perPage,
      },
    })
  })

  const _2645lab_public_posts = graphql(`
    query {
      allPost(
        filter: {
          is_public: { eq: true }
          category: { slug: { eq: "2645lab" } }
        }
      ) {
        edges {
          node {
            slug
          }
          next {
            slug
          }
          previous {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allPost.edges.forEach(({ node, next, previous }) => {
      createPage({
        path: `posts/${node.slug}`,
        component: path.resolve(`./src/templates/2645lab/post.tsx`),
        context: {
          slug: node.slug,
          previous: previous && previous.slug,
          next: next && next.slug,
        },
      })
    })
  })

  const _riko_status_data = graphql(`
    query {
      allTwitterStatusesUserTimelineRikorikorilove {
        nodes {
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
          }
          id_str
          extended_entities {
            media {
              media_url_https
            }
          }
          source
          created_at
          retweet_count
          favorite_count
        }
      }
    }
  `).then(twitterResult => {
    const twitterLen =
      twitterResult.data.allTwitterStatusesUserTimelineRikorikorilove.nodes
        .length
    if (!twitterLen) return
    const lastDate = new Date(
      twitterResult.data.allTwitterStatusesUserTimelineRikorikorilove.nodes[
        twitterLen - 1
      ].created_at
    ).toISOString()
    return graphql(`
      query {
        allPost(
          filter: {
            is_public: { eq: true },
            category: { slug: { eq: "2645lab" } },
            author: { name: { eq: "梨子" } },
            publish_at: { gte: "${lastDate}" }
          },
          sort: {order: DESC, fields: publish_at}) {
          nodes {
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
    `).then(blogResult => {
      const blogLen = blogResult.data.allPost.nodes.length
      const perPage = 20
      const pageCount = Math.ceil((twitterLen + blogLen) / perPage)
      let twitter_p = 0
      let blog_p = 0
      const pushBlog = nodes => {
        blogResult.data.allPost.nodes[blog_p].t = 'post'
        nodes.push(blogResult.data.allPost.nodes[blog_p++])
      }
      const pushTwitter = nodes => {
        const twitter =
          twitterResult.data.allTwitterStatusesUserTimelineRikorikorilove.nodes[
            twitter_p
          ]
        twitter.t = 'twitter'
        twitter.publish_at = new Date(twitter.created_at).toISOString()
        nodes.push(twitter)
        twitter_p++
      }
      for (let i = 1; i <= pageCount; i++) {
        const nodes = []
        for (let j = 0; j < perPage; j++) {
          if (twitter_p >= twitterLen && blog_p >= blogLen) break
          if (twitter_p >= twitterLen) {
            pushBlog(nodes)
            continue
          }
          if (blog_p >= blogLen) {
            pushTwitter(nodes)
            continue
          }
          if (
            new Date(
              twitterResult.data.allTwitterStatusesUserTimelineRikorikorilove.nodes[
                twitter_p
              ].created_at
            ) > new Date(blogResult.data.allPost.nodes[blog_p].publish_at)
          ) {
            pushTwitter(nodes)
          }
          pushBlog(nodes)
        }
        createJSON({
          path: `riko/status/${i}.json`,
          context: {
            nodes,
            pageInfo: {
              pageCount,
              perPage,
            },
          },
        })
      }
    })
  })

  return Promise.chain([
    _2645lab_index_pages,
    _2645lab_public_posts,
    _riko_status_data,
  ])
}
