module.exports = {
  siteMetadata: {
    title: `2645 实验室`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `梨子`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-stylus`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://cms.cool2645.com`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`post`, `author`, 'category', 'tag'],
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-external-links`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: {
                sh: 'shell',
              },
              aliases: {},
              showLineNumbers: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `typography`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `2645-shi-yan-shi`,
      },
    },
    {
      resolve: `gatsby-source-twitter`,
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
          access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        },
        queries: {
          rikorikorilove: {
            endpoint: 'statuses/user_timeline',
            params: {
              screen_name: 'rikorikorilove',
              include_rts: true,
              exclude_replies: true,
              tweet_mode: 'extended',
              count: 100,
            },
          },
        },
      },
    },
  ],
}
