import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import {
  HeaderContainer,
  LogoDiv,
  StyledSpan,
  Navigation,
  SearchForm,
  LogInContainer,
  LogInLink,
  SignUpLink,
} from './HeaderStyles';
import { useNavigate } from 'react-router';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?page=1&size=100&search=${searchText}`);
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.tagName !== 'INPUT') {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

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
      <SearchForm onSubmit={handleSearchSubmit}>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onClick={handleInputClick}
            onChange={handleSearchInputChange}
            value={searchText}
          />
          <i
            role="button"
            tabIndex={0}
            className="fa-solid fa-magnifying-glass fa-lg"
            style={{
              cursor: 'pointer',
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          ></i>
        </div>
      </SearchForm>
      {showDropdown && <SearchDropdown />}
      <LogInContainer>
        <LogInLink to="/login">Log in</LogInLink>
        <SignUpLink to="/signup">Sign up</SignUpLink>
      </LogInContainer>
    </HeaderContainer>
  );
};

export default Header;
