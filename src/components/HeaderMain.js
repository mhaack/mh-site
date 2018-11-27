import React from 'react'
import { Link } from 'gatsby'

import logo from '../assets/images/logo.svg'

const Header = props => (
    <header id="header" className="alt">
        <span className="logo">
            <Link to="/" title="Back to home">
                <img src={logo} alt="Logo" />
            </Link>
        </span>

        <h1>Hi, my name is Markus</h1>
        <p>Software engineer at Adobe and proud dad</p>
    </header>
)

export default Header
