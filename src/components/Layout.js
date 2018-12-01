import React from 'react'
import { node } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Footer from './Footer'

import '../assets/scss/main.scss'

class Template extends React.Component {
    static propTypes = {
        children: node.isRequired
    }
    
    constructor(props) {
        super(props)
        this.state = {
            loading: 'is-loading'
        }
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.setState({ loading: '' })
        }, 100)
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
    }

    render() {
        const { children } = this.props

        return (
            <StaticQuery
                query={graphql`
                    query LayoutQuery {
                        site {
                            siteMetadata {
                                title
                                description
                            }
                        }
                    }
                `}
                render={data => (
                    <>
                        <Helmet htmlAttributes={{ lang: 'en' }}>
                            <title>{data.site.siteMetadata.title}</title>
                            <meta name="description" content={data.site.siteMetadata.description} />
                        </Helmet>
                        <div className={`body ${this.state.loading}`}>
                            <div id="wrapper">
                                {children}
                                <Footer />
                            </div>
                        </div>
                    </>
                )}
            />
        )
    }
}

export default Template
