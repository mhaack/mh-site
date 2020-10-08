import React from 'react'
import styled from '@emotion/styled'

import Headings from '@narative/gatsby-theme-novela/src/components/Headings'
import Image from '@narative/gatsby-theme-novela/src/components/Image'
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media'
import Anchor from '@components/Anchor'

const About: React.FC = ({ author }) => {
    return (
        <AboutContainer>
            <AboutHeading>About Me</AboutHeading>
            <AboutSpotlight>
                <AboutContent dangerouslySetInnerHTML={{ __html: author.bio }}></AboutContent>
                <AboutImage>
                    <RoundedImage src={author.avatar.medium} />
                </AboutImage>
            </AboutSpotlight>
        </AboutContainer>
    )
}

export default About

const AboutContainer = styled.div`
    ${mediaqueries.tablet`
        width: 100%;
    `}
`

const AboutSpotlight = styled.div`
    margin: 20px 0;
    display: flex;

    ${mediaqueries.tablet`
        width: 100%;
        flex-direction: column-reverse;
    `}
`

const AboutHeading = styled(Headings.h2)`
    color: ${p => p.theme.colors.primary};

    a {
        color: ${p => p.theme.colors.accent};
    }
`

const AboutContent = styled.div`
    font-size: 21px;
    color: ${p => p.theme.colors.secondary};
    flex: 1 1;

    p {
        margin: 0 0 2em;
    }

    a {
        transition: ${p => p.theme.colorModeTransition};
        color: ${p => p.theme.colors.accent};
        &:visited {
            color: ${p => p.theme.colors.accent};
            opacity: 0.85;
        }
        &:hover,
        &:focus {
            text-decoration: underline;
        }
    }
`

const AboutImage = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-left: 4em;

    border: solid 1px #ddd;

    ${mediaqueries.desktop`
        width: 200px;
        height: 200px;
    `}

    ${mediaqueries.tablet`
        margin: 1em auto;
    `};
`

const RoundedImage = styled(Image)`
    padding: 0.65em;
    margin: 10px;
    border-radius: 50%;
`
