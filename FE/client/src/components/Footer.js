import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #202225;
  color: #babfc4;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  max-width: 1264px;
  margin: 0 auto;
  padding: 24px 16px;
  @media (max-width: 990px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 50px;
  padding-right: 20px;
  @media (max-width: 500px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-grow: 1;
`;

const Column = styled.div`
  flex: 1;
  h5 {
    font-size: 13px;
    font-weight: 700;
    color: #9199a1;
    margin: 0;
    margin-bottom: 12px;
    &:hover {
      color: #ffffff;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 4px;
  }

  a {
    color: #8a8d90;
    text-decoration: none;
    &:hover {
      color: #ffffff;
    }
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  flex: 1;
  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 12px;
    font-weight: 600;
    a {
      color: #8a8d90;
      text-decoration: none;
      &:hover {
        color: #d1d2d3;
      }
    }
  }

  p {
    font-size: 12px;
    color: #8a8d90;
    margin-top: 16px;
  }
`;
const Footer = () => {
  const footerColumns = [
    { title: 'STACK OVERFLOW', links: ['Questions', 'Help'] },
    {
      title: 'PRODUCTS',
      links: ['Teams', 'Advertising', 'Collectives', 'Talent'],
    },
    {
      title: 'COMPANY',
      links: [
        'About',
        'Press',
        'Work Here',
        'Legal',
        'Privacy Policy',
        'Terms of Service',
        'Contact Us',
      ],
    },
    {
      title: 'STACK EXCHANGE NETWORK',
      links: [
        'Technology',
        'Culture & recreation',
        'Life & arts',
        'Science',
        'Professional',
        'Business',
        'API',
        'Data',
      ],
    },
  ];

  return (
    <StyledFooter>
      <FooterContainer>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1024px-Stack_Overflow_icon.svg.png?20190716190036"
          alt="logo"
        />
        <Nav>
          {footerColumns.map((column) => (
            <Column key={column.title}>
              <h5>{column.title}</h5>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </Column>
          ))}
        </Nav>
        <AdditionalInfo>
          <ul>
            <li>
              <a href="/">Blog</a>
            </li>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">LinkedIn</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
          </ul>
          <p>
            Site design / logo © 2023 Stack Exchange Inc; user contributions
            licensed under CC BY-SA. rev 2023.8.9.43572
          </p>
        </AdditionalInfo>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
