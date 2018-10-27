import React from 'react'
import { Link } from 'gatsby'
import Footer from '../components/Footer'
import avatar from '../assets/images/markus.jpg'

const Header = () => (
    <header id="header">
        <div className="inner">
            <Link to="/" className="image avatar">
                <img src={avatar} alt="Markus" />
            </Link>
            <h1>
                <strong>Hi, my name is Markus</strong>
            </h1>
            <p>
                &nbsp;Software engineer at Adobe
                <br />
                and a proud dad.
            </p>
        </div>
        <Footer />
    </header>
)

export default Header
