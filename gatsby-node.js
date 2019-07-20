/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require(`crypto`)
const path = require(`path`)

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

  return Promise.chain([_2645lab_index_pages, _2645lab_public_posts])
}
