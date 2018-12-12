const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const projectPage = path.resolve('./src/templates/project-page.js')
        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(
                            filter: { frontmatter: { type: { eq: "project" } } }
                            sort: { fields: [frontmatter___date], order: DESC }
                            limit: 1000
                        ) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                    frontmatter {
                                        title
                                    }
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                // create project pages.
                const projects = result.data.allMarkdownRemark.edges

                projects.forEach((project, index) => {
                    createPage({
                        path: project.node.fields.slug,
                        component: projectPage,
                        context: {
                            slug: project.node.fields.slug
                        }
                    })
                })
            })
        )
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value
        })
    }
}
