import React from 'react'
import { shape, object } from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import HeaderGeneric from '../components/HeaderGeneric'

class ProjectPageTemplate extends React.Component {
    renderActionLinks(frontmatter) {
        const githubLink = frontmatter.github ? (
            <a href={frontmatter.github} target="__blank" className="icon fab fa-github" title="More on Github">
                <span className="label">Github</span>
            </a>
        ) : (
            ''
        )

        const hacksterLink = frontmatter.hacksterio ? (
            <a
                href={frontmatter.hacksterio}
                target="__blank"
                className="icon icon-hackster"
                title="More on Hackster.io">
                <span className="label">Hackster.io</span>
            </a>
        ) : (
            ''
        )

        let actionLinks = ''
        if (githubLink || hacksterLink) {
            actionLinks = (
                <>
                    More on: {githubLink} {hacksterLink}
                </>
            )
        }
        return actionLinks
    }

    render() {
        const project = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title

        return (
            <Layout>
                <Helmet title={`${project.frontmatter.title} | ${siteTitle}`} />
                <HeaderGeneric
                    header={{
                        title: project.frontmatter.title
                    }}
                />
                <div id="main">
                    <section id="content" className="main project-page">
                        <span className="image main">
                            <Img fluid={project.frontmatter.image.childImageSharp.fluid} />
                        </span>
                        <span className="project-meta align-right">
                            Publish on: {project.frontmatter.date} | {project.timeToRead} minute read
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: project.html }} />
                        {this.renderActionLinks(project.frontmatter)}
                    </section>
                </div>
            </Layout>
        )
    }
}

ProjectPageTemplate.propTypes = {
    data: shape({
        markdownRemark: object.isRequired,
        site: object.isRequired
    }).isRequired
}

export default ProjectPageTemplate

export const pageQuery = graphql`
    query ProjectBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            timeToRead
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                image {
                    childImageSharp {
                        fluid(maxWidth: 1024) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                github
                hacksterio
            }
        }
    }
`
