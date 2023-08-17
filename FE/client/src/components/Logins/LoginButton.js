import { styled } from 'styled-components';

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  font-size: 13px;

  color: #ffffff;
  background-color: #0995ff;

  cursor: pointer;

  &:hover {
    background-color: #0073cc;
  }
  &:active {
    background-color: #0162c0;
  }
`;

const LoginAndSignupButton = ({ text }) => {
  return <LoginButton>{text}</LoginButton>;
};

export default LoginAndSignupButton;
