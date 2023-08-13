import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  padding: 24px;
  background-color: #f1f2f3;
  height: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
`;

const OAuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  padding: 8px 65px;
  border-radius: 5px;
  border: ${(props) =>
    props.backgroundcolor === '#ffffff' ? '1px solid #DCDEE1' : '0px'};
  font-weight: 500;

  > span {
    font-size: 13px;
    letter-spacing: 0.5px;
  }

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.textcolor};

  &:hover {
    background-color: ${(props) =>
      props.backgroundcolor === '#ffffff'
        ? '#F8F9F9'
        : props.backgroundcolor === '#2F3337'
        ? '#23262A'
        : props.backgroundcolor === '#1977F2'
        ? '#0073CC'
        : null};
  }

  &:active {
    background-color: ${(props) =>
      props.backgroundcolor === '#2F3337'
        ? '#0D0D0E'
        : props.backgroundcolor === '#1977F2'
        ? '#004b84'
        : null};

    box-shadow: ${(props) =>
      props.backgroundcolor === '#ffffff'
        ? '0px 0px 5px rgba(0, 0, 0, 0.3)'
        : '0px 2px 6px rgba(0, 0, 0, 0.3)'};
  }
`;

const FormContainer = styled.div`
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

const FormLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  padding: 2px 0px;
`;

const FormLink = styled(Link)`
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

const FormInput = styled.input`
  width: 100%;
  padding: 8px 9px;
  font-size: 13px;
  border: 1px solid #babfc4;
  border-radius: 5px;
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

const LoginNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  > div {
    text-align: center;
  }

  > div > span {
    font-size: 13px;
    font-weight: 400;
    line-height: 17px;
  }
  :last-child {
    margin-top: 12px;
  }
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
          <OAuthContainer>
            <OAuthButton backgroundcolor={'#ffffff'}>
              <img
                src="/icons/Google_G_Logo.png"
                alt="githublogo"
                width="18px"
              ></img>
              <span>Log in with Google</span>
            </OAuthButton>
            <OAuthButton backgroundcolor={'#2F3337'} textcolor={'#ffffff'}>
              <img
                src="/icons/github-mark-white.png"
                alt="githublogo"
                width="18px"
              ></img>
              <span>Log in with Github</span>
            </OAuthButton>
            <OAuthButton backgroundcolor={'#1977F2'} textcolor={'#ffffff'}>
              <img
                src="/icons/f_logo_RGB-White_58.png"
                alt="facebooklogo"
                width="18px"
              ></img>
              <span>Log in with Facebook</span>
            </OAuthButton>
          </OAuthContainer>
          <FormContainer>
            <FormBox>
              <div>
                <FormLabel>Email</FormLabel>
                <div>
                  <FormInput type="email" size="30"></FormInput>
                </div>
              </div>
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
          <LoginNav>
            <div>
              <span>{"Don't have an account? "}</span>
              <FormLink>Sign up</FormLink>
            </div>
            <div>
              <span>{'Are you an employer? '}</span>
              <FormLink>Sign up on Talent</FormLink>
            </div>
          </LoginNav>
        </LoginContainer>
      </div>
    </MainContainer>
  );
};

export default Login;
