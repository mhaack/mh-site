import React from 'react'
import { Link } from 'gatsby'

import logo from '../assets/images/logo.svg'
import { object } from 'prop-types';

class HeaderGeneric extends React.Component {
    render() {
        const headerTitle = this.props.header.title ? <h1>{this.props.header.title}</h1> : ''
        const headerDescription = this.props.header.description ? <p>{this.props.header.description}</p> : ''

        return (
            <header id="header">
                <span className="logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </span>
                {headerTitle}
                {headerDescription}
            </header>
        )
    }
}

HeaderGeneric.propTypes = {
    header: object
}

export default HeaderGeneric
