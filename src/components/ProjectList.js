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
        const projectFrontmatter = project.node.frontmatter
        const projectLink = projectFrontmatter.project ? projectFrontmatter.project : project.node.fields.slug
        return (
            <li>
                <a href={projectLink} title={projectFrontmatter.title}>
                    <h3>{projectFrontmatter.title}</h3>
                </a>
                <div>
                    <span className="image left">
                        <a href={projectLink} title={projectFrontmatter.title}>
                            <Img fluid={projectFrontmatter.image.childImageSharp.fluid} />
                        </a>
                    </span>
                    {projectFrontmatter.description}
                    {this.renderActionLinks(projectFrontmatter)}
                </div>
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
