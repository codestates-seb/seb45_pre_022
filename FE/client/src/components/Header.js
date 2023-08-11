import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  gap: 5px;
  position: fixed;
  right: 0;
  overflow: hidden;

  width: 100%;
  height: 52px;
  background-color: white;
  border-bottom: 2px solid #e4e6e8;
  border-top: 3px solid #f48224;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e4e6e8;
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration-line: none;

    color: black;
    &:visited {
      text-decoration: none;
    }
    &:active {
      text-decoration: none;
    }
  }
  > a > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    width: 150px;
    height: 30px;
    white-space: 'nowrap';
  }
`;

const StyledSpan = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-left: 2px;
`;

const Navigation = styled.ol`
  display: flex;
  align-items: center;
  gap: 3px;
  list-style: none;

  > li {
    padding: 8px 10px;
    border-radius: 1000px;
    color: #888a8c;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap; /* 줄바꿈 방지 */

    &:hover {
      background-color: #e4e6e8;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  > div {
    position: relative;
    padding: 5px;
    flex-grow: 1;
  }
  > div > input {
    position: relative;
    padding-left: 30px;
    height: 30px;
    width: 100%;
    border: 2px solid #babfc4;
    border-radius: 5px;

    &:focus {
      box-shadow:
        0 0 10px #e1ecf8,
        0 0 10px #e1ecf8,
        10px 0 10px #e1ecf8,
        -10px 0 10px #e1ecf8;
    }
  }
`;

const LogInContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LogInLink = styled(Link)`
  background-color: #b3d3ea;
  color: #436c89;

  padding: 8px 10.4px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  white-space: nowrap; /* 줄바꿈 방지 */

  &:hover {
    background-color: #94b6ce;
  }
`;

const SignUpLink = styled(Link)`
  background-color: #0995ff;
  color: white;
  padding: 8px 10.4px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  white-space: nowrap; /* 줄바꿈 방지 */

  &:hover {
    background-color: #0073cc;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoDiv>
        <Link to="/">
          <img src="/icons/Stack_Overflow_icon.png" alt="logo" width="30"></img>
          <span>
            stack <StyledSpan>overflow</StyledSpan>
          </span>
        </Link>
      </LogoDiv>
      <Navigation>
        <li>About</li>
        <li>Products</li>
        <li>For Teams</li>
      </Navigation>
      <SearchForm>
        <div>
          <input placeholder="Search..." />
          <i
            className="fa-solid fa-magnifying-glass fa-lg"
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          ></i>
        </div>
      </SearchForm>
      <LogInContainer>
        <LogInLink to="/login">Log in</LogInLink>
        <SignUpLink to="/signup">Sign up</SignUpLink>
      </LogInContainer>
    </HeaderContainer>
  );
};

export default Header;
