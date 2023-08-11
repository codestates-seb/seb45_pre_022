import { styled } from 'styled-components';

const MainContainer = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const OauthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  return (
    <MainContainer>
      <div>
        <img
          src="/icons/Stack_Overflow_icon-icons.com_66761.png"
          alt="logo"
          width="32px"
        ></img>
      </div>
      <OauthContainer>
        <button>Log in width Google</button>
        <button>Log in width Github</button>
        <button>Log in width Facebook</button>
      </OauthContainer>
      <div>
        <div>
          <div>Email</div>
          <input></input>
        </div>
        <div>
          <div>Password</div>
          <input></input>
        </div>
        <button>Log in</button>
      </div>
    </MainContainer>
  );
};

export default Login;
