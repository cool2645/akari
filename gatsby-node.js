/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const crypto = require(`crypto`);

const digest = data => {
  return crypto
    .createHash(`md5`)
    .update(JSON.stringify(data))
    .digest(`hex`);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions;
  if (node.internal.type === "StrapiPost") {
    if (node.copyright_notice) {
      createNode({
        id: node.id + "-copyright-notice",
        parent: node.id + "-markdown",
        children: [],
        internal: {
          type: "CopyrightNotice",
          mediaType: "text/markdown",
          content: node.copyright_notice,
          contentDigest: digest(node.copyright_notice)
        }
      })
    }
    createNode({
      ...node,
      id: node.id + "-markdown",
      parent: node.id,
      children: node.copyright_notice ? [
        node.id + "-copyright-notice"
      ] : [],
      internal: {
        type: "Post",
        mediaType: "text/markdown",
        content: node.content,
        contentDigest: digest(node)
      },
    });
  }
};
