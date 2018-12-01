import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
    <footer id="footer">
        <section id="contact">
            <h2>Get In Touch</h2>
            <p>Want to have a chat? Send me a message.</p>
            <form name="contact" method="post" action="/success" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="bot-field" />

                <div className="row uniform 50%">
                    <div className="6u 12u$(xsmall)">
                        <input type="text" name="name" id="name" placeholder="Name" aria-label="Name" />
                    </div>
                    <div className="6u 12u$(xsmall)">
                        <input type="email" name="email" id="email" placeholder="Email" aria-label="Email" />
                    </div>
                    <div className="12u">
                        <textarea name="message" id="message" placeholder="Message" rows="4" aria-label="Message" />
                    </div>
                    <ul className="actions">
                        <li>
                            <input type="submit" value="Send Message" className="button special" />
                        </li>
                    </ul>
                </div>
            </form>
        </section>
        <section>
            <h2>My channels</h2>
            <p>You can find me on the following social channels.</p>

            <ul className="icons">
                <li>
                    <a href="https://twitter.com/mhaack" className="icon fab fa-twitter alt" title="Twitter">
                        <span className="label">Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/mhaack" className="icon fab fa-instagram alt" title="Instagram">
                        <span className="label">Instagram</span>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/mhaack" className="icon fab fa-github alt" title="GitHub">
                        <span className="label">Github</span>
                    </a>
                </li>
                <li>
                    <a
                        href="https://de.linkedin.com/in/markushaack"
                        className="icon fab fa-linkedin alt"
                        title="Linkedin">
                        <span className="label">LinkedIn</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.xing.com/profile/Markus_Haack" className="icon fab fa-xing alt" title="Xing">
                        <span className="label">Xing</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:mail@markus-haack.de" className="icon far fa-envelope alt" title="E-Mail">
                        <span className="label">Email</span>
                    </a>
                </li>
            </ul>
        </section>
        <p className="copyright">
            Made with ❤ by Markus Haack | Built with:{' '}
            <a href="https://www.gatsbyjs.org/" title="Gatsby.js" target="_blank" rel="noopener noreferrer">
                Gatsby.js
            </a>{' '}
            | Thanks to&nbsp;
            <a href="https://html5up.net" title="html5up.net" target="_blank" rel="noopener noreferrer">
                HTML5 UP
            </a>{' '}
            for their beautiful design |{' '}
            <Link to="imprint" title="Impressum">
                Impressum
            </Link>
        </p>
    </footer>
)

export default Footer
