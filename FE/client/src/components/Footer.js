import styled from 'styled-components';

import footerObj from './footerObj';

const FooterContainer = styled.footer`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  width: 100%;
  height: 300px;
  padding: 12px 32px;
  background-color: #202225;
  color: #babfc4;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Section = styled.div`
  margin-bottom: 10px;
  color: #babfc4;
  font-size: 13px;
`;

const LinkRow = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  padding: 5px 0px;
  margin-top: 2px;

  > h6 {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    color: #9199a1;
  }

  > h6:hover {
    color: #ffffff;
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  align-items: flex-start;
  font-size: 10px;
  font-weight: 600;
  color: #9199a1;
  > h6 {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
`;

const Paragraph = styled.p`
  margin-top: 200px;
  padding: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        {footerObj.map((el, i) => (
          <Section key={i}>
            {i === 0 ? (
              <>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1024px-Stack_Overflow_icon.svg.png?20190716190036"
                  alt="Logo"
                  width="50"
                />
                <h3>{el.title}</h3>
              </>
            ) : (
              <>
                <h3>{el.title}</h3>
                {i === 5 ? (
                  <AdditionalInfo>
                    {el.links.map((link, j) => (
                      <h6 key={j}>{link.name}</h6>
                    ))}
                  </AdditionalInfo>
                ) : (
                  el.links.map((link, j) => (
                    <LinkRow key={j}>
                      <h6>{link.name}</h6>
                    </LinkRow>
                  ))
                )}
                {i === 5 && (
                  <Paragraph>
                    Site design / logo © 2023 Stack Exchange Inc; user
                    contributions licensed under CC BY-SA. rev 2023.8.9.43572
                  </Paragraph>
                )}
              </>
            )}
          </Section>
        ))}
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
