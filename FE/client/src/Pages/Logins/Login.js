import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import OAuth from '../../components/Logins/OAuth';
import LoginNavBar from '../../components/Logins/LoginNav';
import Form, { FormInput, FormLabel } from '../../components/Logins/Form';
import LoginAndSignupButton from '../../components/Logins/LoginButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://ec2-3-39-189-62.ap-northeast-2.compute.amazonaws.com:8080/auth/login',
        { username: email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
              <Form label="Email" size="25" onChange={handleEmailChange} />
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormLabel>Password</FormLabel>
                  <FormLink>Forgot password?</FormLink>
                </div>
                <div>
                  <FormInput
                    type="password"
                    onChange={handlePasswordChange}
                  ></FormInput>
                </div>
              </div>
              <LoginAndSignupButton text="Log in" />
            </FormBox>
          </FormContainer>
          <LoginNavBar situation="Log in" onSubmit={onSubmit} />
        </LoginContainer>
      </div>
    </MainContainer>
  );
};

export default Login;
