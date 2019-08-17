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
  if (
    node.internal.type === 'Post' &&
    node.category.slug == '2645lab' &&
    node.is_public
  ) {
    createNode({
      ...node,
      id: node.id + '-status',
      type: 'post',
      internal: {
        type: 'Status',
        content: node.content,
        contentDigest: digest(node),
      },
    })
  } else if (
    node.internal.type === 'twitterStatusesUserTimelineRikorikorilove'
  ) {
    createNode({
      ...node,
      id: node.id + '-status',
      type: 'twitter',
      author: {
        name: '梨子',
      },
      publish_at: new Date(node.created_at).toISOString(),
      internal: {
        type: 'Status',
        content: node.full_text,
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
  `).then(result => {
    const perPage = 20
    const pageCount = Math.ceil(result.data.allStatus.nodes.length / perPage)
    for (let i = 1; i <= pageCount; i++) {
      createJSON({
        path: `riko/status/${i}.json`,
        context: {
          nodes: result.data.allStatus.nodes
            .slice((i - 1) * perPage, i * perPage)
            .map(node => {
              for (const k in node) {
                if (node[k] === null) delete node[k]
              }
              return node
            }),
          pageInfo: {
            pageCount,
            perPage,
          },
        },
      })
    }
  })

  return Promise.chain([
    _2645lab_index_pages,
    _2645lab_public_posts,
    _riko_status_data,
  ])
}
