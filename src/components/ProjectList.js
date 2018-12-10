import React from 'react'
import { object, arrayOf } from 'prop-types'
import Img from 'gatsby-image'

class Project extends React.Component {
    static propTypes = {
        project: object.isRequired
    }

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
                    <br />
                    <span className="more">
                        {githubLink} {hacksterLink}
                    </span>
                </>
            )
        }
        return actionLinks
    }

    render() {
        const project = this.props.project
        return (
            <li>
                <a href={project.node.fields.slug} title={project.node.frontmatter.title}>
                    <h3>{project.node.frontmatter.title}</h3>
                </a>
                <p>
                    <span class="image left">
                        <a href={project.node.fields.slug} title={project.node.frontmatter.title}>
                            <Img fluid={project.node.frontmatter.image.childImageSharp.fluid} />
                        </a>
                    </span>
                    {project.node.frontmatter.description}
                    {this.renderActionLinks(project.node.frontmatter)}
                </p>
            </li>
        )
    }
}

const ProjectList = ({ projects }) => (
    <ul>
        {projects.map(project => (
            <Project key={project.node.frontmatter.title} project={project} />
        ))}
    </ul>
)

ProjectList.propTypes = {
    projects: arrayOf(object).isRequired
}

export default ProjectList
