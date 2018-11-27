import React from 'react'
import { graphql } from 'gatsby'
import Waypoint from 'react-waypoint'

import Layout from '../components/Layout'
import Header from '../components/HeaderMain'
import Projects from '../components/Projects'
import Nav from '../components/Nav'

import avatar from '../assets/images/markus.jpg'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stickyNav: false
        }
    }

    _handleWaypointEnter = () => {
        this.setState(() => ({ stickyNav: false }))
    }

    _handleWaypointLeave = () => {
        this.setState(() => ({ stickyNav: true }))
    }

    render() {
        return (
            <Layout>
                <Header />
                <Waypoint onEnter={this._handleWaypointEnter} onLeave={this._handleWaypointLeave} />
                <Nav sticky={this.state.stickyNav} />

                <div id="main">
                    <section id="intro" className="main">
                        <div className="spotlight">
                            <div className="content">
                                <header className="major">
                                    <h2>Hello I'm ...</h2>
                                </header>
                                <p>
                                    ...Markus Haack, a developer, a engineer, a husband of a wonderful wife and a proud
                                    dad, based in the beautiful city of Leipzig, Germany. I have a bachelors in computer
                                    science and even a good old Dipl-Ing lol.
                                    <br />
                                    Currently I'm a Senior Technical Lead at{' '}
                                    <a href="https://www.adobe.com" target="__blank">
                                        Adobe
                                    </a>{' '}
                                    working on commerce and Adobe Experince Manager.
                                </p>
                                <p>
                                    I play with LEGO and various of electronic &amp; IOT stuff and I'm keen in
                                    automating our house with all kinds of usefull and useless smart devices.
                                </p>
                            </div>
                            <span className="image">
                                <img src={avatar} alt="Markus" />
                            </span>
                        </div>
                    </section>

                    <section id="projects" className="main projects">
                        <header className="special major">
                            <h2>My Latest Projects</h2>
                            <p>Stuff I worked on recently</p>
                        </header>

                        <Projects projects={this.props.data.projects.edges} />

                        {/* <footer className="major">
                            <ul className="actions">
                                <li>
                                    <Link to="/projects" className="button">
                                        Explore all my projects
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://github.com/mhaack" className="button">
                                        More on GitHub
                                    </a>
                                </li>
                            </ul>
                        </footer> */}
                    </section>
                </div>
            </Layout>
        )
    }
}

export default Index

export const query = graphql`
    query PageQuery {
        projects: allMarkdownRemark(
            filter: { frontmatter: { type: { eq: "project" } } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 10
        ) {
            edges {
                node {
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
