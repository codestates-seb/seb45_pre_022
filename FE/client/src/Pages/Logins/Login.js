import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/Logins/OAuth';
import LoginNavBar from '../../components/Logins/LoginNav';
import Form from '../../components/Logins/Form';
import LoginAndSignupButton from '../../components/Logins/LoginButton';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/loginSlice';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 24px;
  background-color: #f1f2f3;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  border-radius: 10px;
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  margin-bottom: 24px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;

  gap: 15px;
  width: 100%;
`;

export const FormLink = styled(Link)`
  text-decoration: none;
  color: #0074cc;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: #0a95ff;
  }
`;

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [errorEmailMsg, setErrorEmailMsg] = useState('');
  const [errorPasswordMsg, setErrorPasswordMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expirationDate = new Date(Date.now() + 3600000);

  const handleEmailChange = (e) => {
    if (e.target.value !== '') {
      setErrorEmailMsg('');
    }
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    if (e.target.value !== '') {
      setErrorPasswordMsg('');
    }
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    if (!email || !password) {
      if (!email) {
        setErrorEmailMsg('Email cannot be empty.');
      }
      if (!password) {
        setErrorPasswordMsg('Password cannot be empty.');
      }
      setLoginLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { username: email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      document.cookie = `access_token=${response.data.accessToken}; path=/;`;
      document.cookie = `refresh_token=${response.data.refreshToken}; path=/;`;
      document.cookie = `memberId=${
        response.data.memberId
      }; expires=${expirationDate.toUTCString()}; path=/`;

      dispatch(setUser());
      navigate('/');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoginLoading(false);
  };

  return (
    <MainContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <LoginContainer>
          <div style={{ marginBottom: '30px' }}>
            <img
              src="/icons/Stack_Overflow_icon.png"
              alt="logo"
              width="40px"
            ></img>
          </div>
          <OAuth situation="Log in" />
          <FormContainer>
            <FormBox onSubmit={onSubmit}>
              <Form
                label="Email"
                size="25"
                onChange={handleEmailChange}
                errorMsg={errorEmailMsg}
              />
              <Form
                label="Password"
                size="25"
                onChange={handlePasswordChange}
                errorMsg={errorPasswordMsg}
              />
              <LoginAndSignupButton text="Log in" isLoading={isLoginLoading} />
            </FormBox>
          </FormContainer>
          <LoginNavBar situation="Log in" onSubmit={onSubmit} />
        </LoginContainer>
      </div>
    </MainContainer>
  );
};

export default Login;
