import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;

  background-color: red;
`;

const Navtigation = styled.ol`
  display: flex;
  list-style: none;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div style={{ padding: '5px' }}>
        <Link to="/">
          <span>stack overflow</span>
        </Link>
      </div>
      <Navtigation>
        <li>About</li>
        <li>Products</li>
        <li>For Teams</li>
      </Navtigation>
      <div>Search</div>
      <ButtonContainer>
        <button>Log in</button>
        <button>Sign up</button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
