import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import OAuth from '../../components/Logins/OAuth';
import LoginNavBar from '../../components/Logins/LoginNav';
import Form from '../../components/Logins/Form';

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

export const FormLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  padding: 2px 0px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px 9px;
  font-size: 13px;
  border: 1px solid #babfc4;
  border-radius: 5px;
`;

const Login = () => {
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
          <OAuth />
          <FormContainer>
            <FormBox>
              <Form label="Email" />
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
                  <FormInput></FormInput>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <LoginButton>Log in</LoginButton>
              </div>
            </FormBox>
          </FormContainer>
          <LoginNavBar />
        </LoginContainer>
      </div>
    </MainContainer>
  );
};

export default Login;
