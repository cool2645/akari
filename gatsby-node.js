/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const fs = require('fs')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const { siteMetadata } = require('./gatsby-config')

exports.sourceNodes = async ({
  actions,
  store,
  cache,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  for (const author of siteMetadata.authors) {
    const nodeId = createNodeId(`author-${author.name}`)
    let fileNode
    try {
      fileNode = await createRemoteFileNode({
        parentNodeId: nodeId,
        url: author.avatarUrl,
        store,
        cache,
        createNode,
        createNodeId: () => `${author.name}-local-image`,
      })
    } catch (err) {
      console.error('avatar image download ERROR:', err)
    }
    await createNode({
      id: nodeId,
      ...author,
      children: fileNode ? [fileNode.id] : [],
      internal: {
        type: 'Author',
        content: JSON.stringify(author),
        contentDigest: createContentDigest(author),
      },
    })
  }
}

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createContentDigest,
}) => {
  const { createNode } = actions
  if (node.internal.type === 'StrapiPost') {
    if (node.copyright_notice) {
      await createNode({
        id: node.id + '-copyright-notice',
        parent: node.id + '-markdown',
        children: [],
        internal: {
          type: 'CopyrightNotice',
          mediaType: 'text/markdown',
          content: node.copyright_notice,
          contentDigest: createContentDigest(node.copyright_notice),
        },
      })
    }
    await createNode({
      ...node,
      id: node.id + '-markdown',
      parent: node.id,
      children: node.copyright_notice ? [node.id + '-copyright-notice'] : [],
      internal: {
        type: 'Post',
        mediaType: 'text/markdown',
        content: node.content,
        contentDigest: createContentDigest(node),
      },
    })
    return
  }

  if (node.internal.type === 'Post') {
    if (
      node.internal.type === 'Post' &&
      node.category.slug == '2645lab' &&
      node.is_public
    ) {
      await createNode({
        ...node,
        id: node.id + '-status',
        type: 'post',
        internal: {
          type: 'Status',
          content: node.content,
          contentDigest: createContentDigest(node),
        },
      })
    }
    return
  }

  if (node.internal.type === 'twitterStatusesUserTimelineRikorikorilove') {
    let extended_entities = node.extended_entities
    if (!extended_entities && node.retweeted_status) {
      extended_entities = node.retweeted_status.extended_entities
    }
    let fileNode
    if (extended_entities && extended_entities.media) {
      try {
        fileNode = await createRemoteFileNode({
          url: extended_entities.media[0].media_url_https,
          parentNodeId: node.id + '-status',
          store,
          cache,
          createNode,
          createNodeId: () => `${node.id}-status-local-image`,
        })
      } catch (err) {
        console.error('twitter image download ERROR:', err)
      }
    }
    await createNode({
      ...node,
      id: node.id + '-status',
      type: 'twitter',
      author: {
        name: '梨子',
      },
      publish_at: new Date(node.created_at).toISOString(),
      children: fileNode ? [fileNode.id] : [],
      internal: {
        type: 'Status',
        content: node.full_text,
        contentDigest: createContentDigest(node),
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

  return Promise.chain([_2645lab_index_pages, _2645lab_public_posts])
}
