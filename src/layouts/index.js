import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import '../assets/scss/main.scss'

import Header from '../components/Header'

const Template = ({ data, children }) => (
  <div>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>
    <Header />
    {children()}
  </div>
)

Template.propTypes = {
  children: React.PropTypes.func,
}
export default Template

export const query = graphql`
  query TemplateQuery {
    site: site {
      siteMetadata {
        title
        description
      }
    }
  }
`