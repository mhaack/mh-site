import React from 'react'
import { object } from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import ProjectList from '../components/ProjectList'
import Layout from '../components/Layout'
import Header from '../components/HeaderGeneric'

const ProjectsPage = ({ data }) => (
    <Layout>
        <Helmet>
            <title>My Projects</title>
        </Helmet>
        <Header
            header={{
                title: 'My Projects'
            }}
        />
        <div id="main">
            <section className="main projects">
                <header className="special major">
                    <h2>Stuff I worked on recently</h2>
                </header>
                <ProjectList projects={data.projects.edges} />
            </section>
        </div>
    </Layout>
)

ProjectsPage.propTypes = {
    data: object.isRequired
}

export default ProjectsPage

export const query = graphql`
    query ProjectsQuery {
        projects: allMarkdownRemark(
            filter: { frontmatter: { type: { eq: "project" } } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 200) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        link
                        github
                        hacksterio
                    }
                }
            }
        }
    }
`
