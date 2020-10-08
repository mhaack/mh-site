module.exports = {
    siteMetadata: {
        title: `Markus Haack // Software Engineer`,
        name: `| Made with ❤ by Markus Haack | Built with: Gatsby.js & Novela theme`,
        siteUrl: `https://www.markus-haack.com`,
        description: `Software Engineer working at Adobe and proud dad of a wonderful daughter.`,
        hero: {
            heading: `Hi, my name is Markus`,
            subHeading: `Software engineer at Adobe and proud dad`,
            maxWidth: 652
        },
        social: [
            {
                name: `twitter`,
                url: `https://twitter.com/mhaack`
            },
            {
                name: `instagram`,
                url: `https://instagram.com/mhaack`
            },
            {
                name: `github`,
                url: `https://github.com/mhaack`
            },
            {
                name: `linkedin`,
                url: `https://de.linkedin.com/in/markushaack`
            }
        ]
    },
    plugins: [
        {
            resolve: '@narative/gatsby-theme-novela',
            options: {
                contentPosts: 'content/posts',
                contentAuthors: 'content/authors',
                basePath: '/',
                authorsPage: false,
                sources: {
                    local: true
                    // contentful: true,
                }
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Markus Haack // Software Engineer`,
                short_name: `MH`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#fff`,
                display: `standalone`,
                icon: `src/assets/favicon.png`
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-126340503-1',
                head: true,
                anonymize: true,
                respectDNT: true
            }
        },
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {}
        }
    ]
}
