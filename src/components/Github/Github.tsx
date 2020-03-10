import Icons from "@icons";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

type GithubProps = {
    url: string;
    title?: string;
    fill?: string;
};

const Github = ({
    url,
    title = "View on GitHub",
    fill = "#73737D"
}: GithubProps) => (
    <GithubActionContainer>
        <GithubImage>
            <GithubLink href={url} alt={title} target="_blank">
                <Icons.Github fill={fill} />
            </GithubLink>
        </GithubImage>
        <GithubBadge>
            <GithubLink href={url} alt={title} target="_blank">
                {title}
            </GithubLink>
        </GithubBadge>
    </GithubActionContainer>
);

export default Github;

const GithubActionContainer = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: top;
    height: 4em;
    margin: 0 auto 1em;
    padding-right: 1em;
    border: solid 1px #ddd;
    border-radius: 4px;
    background-color: ${p => p.theme.colors.background};

    :hover {
        background: ${p => p.theme.colors.hover};
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }

    ${mediaqueries.tablet`
        height: 3em;
    `};
`;

const GithubImage = styled.div`
    position: absolute;
    margin-top: 1.1em;
    margin-left: 1em;

    svg {
        width: 24px;
        height: 24px;

        ${mediaqueries.tablet`
            width: 14px;
            height: 14px;
        `};
    }

    ${mediaqueries.tablet`
        margin-top: 0.6em;
        margin-left: 0.8em;
    `};
`;

const GithubBadge = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 3em;
    padding-left: 0.5em;

    ${mediaqueries.tablet`
        margin-left: 2em;
    `};
`;

const GithubLink = styled.a`
    color: ${p => p.theme.colors.accent};
`;
