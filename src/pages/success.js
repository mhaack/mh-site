import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Layout from '../components/Layout'
import HeaderGeneric from '../components/HeaderGeneric'

const SuccessPage = () => (
    <Layout>
        <Helmet>
            <title>Thank You.</title>
        </Helmet>
        <HeaderGeneric
            header={{
                title: 'Thank You.'
            }}
        />
        <div id="main">
            <section id="content" className="main">
                <p>Thank you for contacting me. I will read and respond to your message asap.</p>
                <ul className="actions">
                    <li>
                        <Link to="/" title="Home" className="button">
                            Back home for now
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    </Layout>
)

export default SuccessPage
