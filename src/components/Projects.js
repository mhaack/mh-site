import React from 'react'
import { object } from 'prop-types'
import Img from 'gatsby-image'

class Project extends React.Component {
    static propTypes = {
        project: object.isRequired
    }

    render() {
        const project = this.props.project

        let github = ''
        if (project.node.frontmatter.github) {
            github = (
                <p>
                    More on{' '}
                    <a
                        href={project.node.frontmatter.github}
                        target="__blank"
                        className="icon fa-github"
                        title="More on Github">
                        <span className="label">Github</span>
                    </a>
                </p>
            )
        }

        return (
            <article className="6u 12u$(xsmall) work-item">
                <a
                    href={project.node.frontmatter.link}
                    target="__blank"
                    className="image fit"
                    title={project.node.frontmatter.title}>
                    <Img fluid={project.node.frontmatter.image.childImageSharp.fluid} />
                </a>

                <h3>{project.node.frontmatter.title}</h3>
                <p>{project.node.frontmatter.description}</p>

                <ul className="actions">
                    <li>{github}</li>
                </ul>
            </article>
        )
    }
}

const Projects = ({ projects }) => (
    <div>
        <h2>Stuff I’ve Worked On</h2>
        <div className="row">
            {projects.map(project => (
                <Project key={project.node.frontmatter.title} project={project} />
            ))}
        </div>
    </div>
)
Projects.propTypes = {
    projects: object.isRequired
}

export default Projects
