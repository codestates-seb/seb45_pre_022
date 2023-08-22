import { keyframes, styled } from 'styled-components';

const LoginButton = styled.button`
  position: relative;
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

const LoadingContainer = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  top: 22%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  border-top: 2px solid #ffffff;
  width: 100%;
  height: 100%;
  animation: ${spin} 1.2s linear infinite;
`;

const LoginAndSignupButton = ({ text, isLoading }) => {
  return (
    <div>
      <LoginButton>
        {text}
        {isLoading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : null}
      </LoginButton>
    </div>
  );
};

export default LoginAndSignupButton;
