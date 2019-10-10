module.exports = {
    siteMetadata: {
        title: 'Markus Haack // Software Engineer',
        author: 'Markus Haack',
        description: 'Software Engineer working at Adobe and proud dad of a wonderful daughter.',
    },
    pathPrefix: '/',
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content`,
                name: 'pages',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/assets/images`,
                name: `images`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 630,
                        },
                    },
                    'gatsby-remark-copy-linked-files',
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Markus Haack Website',
                short_name: 'Markus H.',
                start_url: '/',
                background_color: '#333333',
                theme_color: '#49bf9d',
                display: 'minimal-ui',
                icon: 'src/assets/images/icon_hi_res_512.png',
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-126340503-1",
                head: true,
                anonymize: true,
                respectDNT: true
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-offline`
    ],
}
