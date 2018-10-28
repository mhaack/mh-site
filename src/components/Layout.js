import React from 'react'
import { object } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Header from './Header'

import '../assets/scss/main.scss'

const Template = ({ children }) => (
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
                <div>
                    <Header />
                    {children}
                </div>
            </>
        )}
    />
)

Template.propTypes = {
    children: object.isRequired
}

export default Template
