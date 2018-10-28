import React from 'react'
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
                <Helmet htmlAttributes={{ lang: "en" }}>
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

export default Template
