import styled from '@emotion/styled'

import Section from '@narative/gatsby-theme-novela/src/components/Section'
import Headings from '@narative/gatsby-theme-novela/src/components/Headings'
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media'

const Contact: React.FC = () => {
    return (
        <Section narrow id="Articles__Contact">
            <ContactContainer>
                <Content>
                    <Heading>Get In Touch</Heading>
                    <Text>Want to have a chat? Send me a message.</Text>
                    <form
                        name="contact"
                        method="post"
                        action="/success"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field">
                        <input type="hidden" name="bot-field" />

                        <Row>
                            <Field>
                                <Input type="text" name="name" id="name" placeholder="Name" aria-label="Name" />
                            </Field>
                            <Field>
                                <Input type="email" name="email" id="email" placeholder="Email" aria-label="Email" />
                            </Field>
                        </Row>
                        <Row>
                            <Field>
                                <TextArea
                                    name="message"
                                    id="message"
                                    placeholder="Message"
                                    aria-label="Message"
                                    rows="4"
                                />
                            </Field>
                        </Row>
                        <ActionRow>
                            <Button type="submit" value="Send Message">
                                Send Message
                            </Button>
                        </ActionRow>
                    </form>
                </Content>
            </ContactContainer>
        </Section>
    )
}

export default Contact

const ContactContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 64px 0 55px;
    margin: 50px auto;
    background: ${p => p.theme.colors.card};
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
    z-index: 1;
    ${mediaqueries.tablet`
        padding: 50px 0 0;
        text-align: center;
    `}
    ${mediaqueries.phablet`
        margin: -20px auto 80px;
    `}
`

const Content = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 640px;
    ${mediaqueries.tablet`
        h3 {
            padding: 0 50px;
        }
    `}
    ${mediaqueries.phone`
        h3 {
            padding: 0 24px;
        }
    `}
`

const Heading = styled(Headings.h3)`
    margin-bottom: 20px;
    ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
`

const Text = styled.p`
    margin: 0 auto 30px;
    color: ${p => p.theme.colors.grey};
    line-height: 1.75;

    ${mediaqueries.tablet`
        padding: 0 10px;
        margin: 0 auto 25px;
    `}
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0;

    div {
        margin-right: 10px;
    }

    div:last-child {
        margin-right: 0px;
    }

    ${mediaqueries.tablet`
    padding: 0 26px;

  `}
`

const ActionRow = styled(Row)`
    justify-content: flex-start;
`

const Field = styled.div`
    width: 100%;
    border-radius: 4px;
    position: relative;
    background-color: ${p => p.theme.colors.background};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

    :hover {
        background: ${p => p.theme.colors.hover};
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`

const Input = styled.input`
    width: 100%;
    height: 56px;
    position: relative;
    padding: 0 1em;
    border: none;
    border-radius: 4px;
    background: ${p => p.theme.colors.inputBackground};
    color: ${p => p.theme.colors.primary};
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease, 0.3s box-shadow ease, 0.3s padding ease;
    resize: none;

    ::placeholder {
        color: ${p => p.theme.colors.track};
        opacity: 1;
    }
    :-ms-input-placeholder {
        color: ${p => p.theme.colors.track};
    }
    ::-ms-input-placeholder {
        color: ${p => p.theme.colors.track};
    }
`

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0.75em 1em;
    border: none;
    border-radius: 4px;
    background: ${p => p.theme.colors.inputBackground};
    color: ${p => p.theme.colors.primary};
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease, 0.3s box-shadow ease, 0.3s padding ease;
    resize: none;

    ::placeholder {
        color: ${p => p.theme.colors.track};
        opacity: 1;
    }
    :-ms-input-placeholder {
        color: ${p => p.theme.colors.track};
    }
    ::-ms-input-placeholder {
        color: ${p => p.theme.colors.track};
    }
`

const Button = styled.button`
    height: 40px;
    margin: 10px 0;
    padding: 0em 1em;
    border-bottom: 2px solid transparent;
    background-color: transparent;
    transition: 0.3s border ease;
    color: ${p => p.theme.colors.accent};

    :focus,
    :hover {
        border-bottom-color: ${p => p.theme.colors.accent};
    }
`
