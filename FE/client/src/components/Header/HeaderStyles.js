import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  position: fixed;
  right: 0;
  overflow: hidden;

  width: 100%;
  height: 52px;
  background-color: white;
  border-bottom: 2px solid #e4e6e8;
  border-top: 3px solid #f48224;
`;

export const LogoDiv = styled.div`
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

export const StyledSpan = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-left: 2px;
`;

export const Navigation = styled.ol`
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

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 600px;
  position: relative;

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
      box-shadow: 0 0 10px #e1ecf8, 0 0 10px #e1ecf8, 10px 0 10px #e1ecf8,
        -10px 0 10px #e1ecf8;
    }
  }
`;

export const LogInContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LogInLink = styled(Link)`
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

export const SignUpLink = styled(Link)`
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

export const LoginNav = styled.nav`
  ol {
    display: flex;
  }
  ol > li {
    list-style: none;
  }
  ol > li > button {
    border: none;
  }
`;
