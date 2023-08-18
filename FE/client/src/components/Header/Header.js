import { useState, useEffect } from 'react';
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
  LoginNav,
} from './HeaderStyles';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCookieValue } from '../../custom/getCookie';
import { login } from '../../features/loginSlice';
import axios from 'axios';

const Header = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { isLogin, memberId, email, displayName } = useSelector(
    (state) => state.login,
  );

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

  useEffect(() => {
    const memberCookieId = getCookieValue('memberId');
    const refreshToken = getCookieValue('refresh_token');
    if (memberCookieId) {
      axios.get(`${apiUrl}/members/${memberCookieId}`).then((res) => {
        dispatch(login(res.data.data));
      });
    } else if (refreshToken) {
      // alert('로그인이 만료되었습니다');
    }
  }, [isLogin]);

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
      {isLogin ? (
        <LoginNav>
          <ol>
            <li>
              <Link>
                <div>
                  <img
                    src="/icons/profile.png"
                    alt="user-profile"
                    width="24"
                    height="24"
                  ></img>
                </div>
              </Link>
            </li>
            <li>
              <button>
                <svg
                  aria-hidden="true"
                  className="svg-icon iconInbox"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                >
                  <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z" />
                </svg>
              </button>
            </li>
            <li>
              <button>
                <svg
                  aria-hidden="true"
                  className="svg-icon iconAchievements"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3ZM3 7c-.5 0-1-.5-1-1V4h1v3Zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1ZM16 6c0 .5-.5 1-1 1V4h1v2Z" />
                </svg>
              </button>
            </li>
            <li>
              <button>
                <svg
                  aria-hidden="true"
                  className="svg-icon iconHelp"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8Zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23ZM11.77 8c-.59.66-1.78 1.09-2.05 1.97a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.06-1.35.66-2.2 1.83-2.88.39-.29.7-.75.7-1.24.01-1.24-1.64-1.82-2.35-.72-.21.33-.18.73-.18 1.1H5.75c0-1.97 1.03-3.26 3.03-3.26 1.75 0 3.47.87 3.47 2.83 0 .57-.2 1.05-.48 1.44Z" />
                </svg>
              </button>
            </li>
            <li>
              <button>
                <svg
                  aria-hidden="true"
                  className="svg-icon iconStackExchange"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2Zm16-7H1v4h16V6Z" />
                </svg>
              </button>
            </li>
          </ol>
        </LoginNav>
      ) : (
        <LogInContainer>
          <LogInLink to="/login">Log in</LogInLink>
          <SignUpLink to="/signup">Sign up</SignUpLink>
        </LogInContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
