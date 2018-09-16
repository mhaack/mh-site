import React from 'react'
import Projects from '../components/Projects'

const IndexPage = ({ data }) => (
    <div id="main">
        <section id="one">
            <header className="major">
                <h2>I'm ...</h2>
            </header>
            <p>
                ... a developer, a engineer and a proud dad of a wonderful daughter, based in the beautiful city of
                Leipzig, Germany. I have a bachelors in computer science and even a good old Dipl-Ing lol. Currently I'm
                a Senior Technical Lead at{' '}
                <a href="https://www.adobe.com" target="__blank">
                    Adobe
                </a>
                .<br />I play with LEGO and various of electronic &amp; IOT stuff and I'm keen in automating our house
                with all kinds of usefull and useless smart devices.
            </p>
            {/* <p>
                    <ul className="icons">
                        <li>You can message me via: </li>
                        <li>
                            <a href="https://twitter.com/mhaack" className="icon fa-twitter">
                                <span className="label">Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/mhaack" className="icon fa-instagram">
                                <span className="label">Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/mhaack" className="icon fa-github">
                                <span className="label">Github</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://de.linkedin.com/in/markushaack" className="icon fa-linkedin">
                                <span className="label">LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.xing.com/profile/Markus_Haack" className="icon fa-xing">
                                <span className="label">Xing</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:mail@markus-haack.de" className="icon fa-envelope-o">
                                <span className="label">Email</span>
                            </a>
                        </li>
                    </ul>
                </p> */}
        </section>
        <section id="two">
            <Projects projects={data.projects.edges} />
            <ul className="actions">
                <li>
                    <a href="https://github.com/mhaack" className="button">
                        More on GitHub
                    </a>
                </li>
            </ul>
        </section>
        {/* <section id="three">
        <h2>Get In Touch</h2>
        <p>
          Accumsan pellentesque commodo blandit enim arcu non at amet id arcu
          magna. Accumsan orci faucibus id eu lorem semper nunc nisi lorem
          vulputate lorem neque lorem ipsum dolor.
        </p>
        <div className="row">
          <div>
            <form method="post" action="#">
              <div className="row uniform 50%">
                <div className="6u 12u$(xsmall)">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="6u 12u$(xsmall)">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="12u">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Message"
                    rows="4"
                  />
                </div>
              </div>
            </form>
            <ul className="actions">
              <li>
                <input type="submit" value="Send Message" />
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </div>
)

export default IndexPage

export const query = graphql`
    query PageQuery {
        projects: allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" }, published: { eq: true } } }) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                sizes(maxWidth: 500) {
                                    ...GatsbyImageSharpSizes
                                }
                            }
                        }
                        link
                        github
                    }
                }
            }
        }
    }
`
