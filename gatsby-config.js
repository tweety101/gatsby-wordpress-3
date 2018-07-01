const config = require('./data/SiteConfig')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
      author: config.userName,
      copyright: config.copyright
    }
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
        * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
        * Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
        */
       baseUrl: `cms.hindumediabureau.com`,
       // The protocol. This can be http or https.
       protocol: `http`,
       // Indicates whether the site is hosted on wordpress.com.
       // If false, then the asumption is made that the site is self hosted.
       // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
       // If your site is hosted on wordpress.org, then set this to false.
       hostingWPCOM: false,
       // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
       // This feature is untested for sites hosted on Wordpress.com
       useACF: false,
       auth: {
         // If auth.user and auth.pass are filled, then the source plugin will be allowed
         // to access endpoints that are protected with .htaccess.
         htaccess_user: "adriaan",
         htaccess_pass: "blub1234",
         htaccess_sendImmediately: false,
       }
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logos/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-offline'
  ]
}
