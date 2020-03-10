import React from "react";
import styled from "@emotion/styled";

import Headings from "@narative/gatsby-theme-novela/src/components/Headings";
import Image from "@narative/gatsby-theme-novela/src/components/Image";
import mediaqueries from "@narative/gatsby-theme-novela/src/styles/media";

const About: React.FC = ({ author }) => {
    return (
        <AboutContainer>
            <AboutHeading>About Me</AboutHeading>
            <AboutSpotlight>
                <AboutContent>
                    <p>
                        I'm a developer, a engineer, a husband of a wonderful
                        wife and a proud dad, based in the beautiful city of
                        Leipzig, Germany. I have a bachelors in computer science
                        and even a good old Dipl-Ing.
                        <br />
                        Currently I'm a Senior Technical Lead at{" "}
                        <a href="https://www.adobe.com" target="__blank">
                            Adobe
                        </a>{" "}
                        working on{" "}
                        <a
                            href="https://github.com/adobe/aem-core-cif-components"
                            target="__blank"
                        >
                            commerce
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://www.adobe.com/marketing/experience-manager.html"
                            target="__blank"
                        >
                            Adobe Experince Manager
                        </a>
                        .
                    </p>
                    <p>
                        I play with Nintendo and various of electronic &amp; IOT
                        stuff and I'm passionate about smart homes,{" "}
                        <a
                            href="https://www.home-assistant.io/"
                            target="__blank"
                        >
                            Home Assistant
                        </a>{" "}
                        particular and automating our house with all kinds of
                        usefull and useless smart devices.
                    </p>
                </AboutContent>
                <AboutImage>
                    <RoundedImage src={author.avatar.medium} />
                </AboutImage>
            </AboutSpotlight>
        </AboutContainer>
    );
};

export default About;

const AboutContainer = styled.div`
    ${mediaqueries.tablet`
        width: 100%;
    `}
`;

const AboutSpotlight = styled.div`
    margin: 20px 0;
    display: flex;

    ${mediaqueries.tablet`
        width: 100%;
        flex-direction: column-reverse;
    `}
`;

const AboutHeading = styled(Headings.h2)`
    color: ${p => p.theme.colors.primary};

    a {
        color: ${p => p.theme.colors.accent};
    }
`;

const AboutContent = styled.div`
    font-size: 21px;
    color: ${p => p.theme.colors.secondary};
    flex: 1 1;

    p {
        margin: 0 0 2em;
    }
`;

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
`;

const RoundedImage = styled(Image)`
    padding: 0.65em;
    margin: 10px;
    border-radius: 50%;
`;
