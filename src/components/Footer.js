import React from 'react'
import Link from 'gatsby-link'

const Footer = () => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li>
                    <a href="https://twitter.com/mhaack" className="icon fa-twitter" title="Twitter">
                        <span className="label">Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/mhaack" className="icon fa-instagram" title="Instagram">
                        <span className="label">Instagram</span>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/mhaack" className="icon fa-github" title="GitHub">
                        <span className="label">Github</span>
                    </a>
                </li>
                <li>
                    <a href="https://de.linkedin.com/in/markushaack" className="icon fa-linkedin" title="Linkedin">
                        <span className="label">LinkedIn</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.xing.com/profile/Markus_Haack" className="icon fa-xing" title="Xing">
                        <span className="label">Xing</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:mail@markus-haack.de" className="icon fa-envelope-o" title="E-Mail">
                        <span className="label">Email</span>
                    </a>
                </li>
            </ul>
            <ul className="copyright">
                <li>&copy; Markus Haack</li>
                <li>
                    Built with:{' '}
                    <a href="https://www.gatsbyjs.org/" title="Gatsby.js">
                        Gatsby.js
                    </a>{' '}
                    &amp; <a href="http://html5up.net">HTML5 UP</a>
                </li>
                <li>
                    <Link to="imprint" title="Impressum">
                        Impressum
                    </Link>
                </li>
            </ul>
        </div>
    </footer>
)

export default Footer
