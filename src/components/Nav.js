import React from 'react'
import { string } from 'prop-types'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const Nav = props => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        <Scrollspy items={['intro', 'first', 'second', 'cta']} currentClassName="is-active" offset={-300}>
            <li>
                <Scroll type="id" element="intro">
                    <a href="#">Hello</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="projects">
                    <a href="#">Projects</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="contact">
                    <a href="#">Get In Touch</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

Nav.propTypes = {
    sticky: string
}

export default Nav
