import React from 'react'

const Footer = () => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="https://twitter.com/mhaack" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="https://www.instagram.com/mhaack" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="https://github.com/mhaack" className="icon fa-github"><span className="label">Github</span></a></li>
                <li><a href="https://de.linkedin.com/in/markushaack" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                <li><a href="https://www.xing.com/profile/Markus_Haack" className="icon fa-xing"><span className="label">Xing</span></a></li>
                <li><a href="mailto:mail@markus-haack.de" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; Markus Haack</li><li>Built with: <a href="https://www.gatsbyjs.org/">Gatsby.js</a></li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
)
    
export default Footer
