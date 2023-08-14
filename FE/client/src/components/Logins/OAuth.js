import { styled } from 'styled-components';
const OAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
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

const OAuth = () => {
  return (
    <OAuthContainer>
      <OAuthButton backgroundcolor={'#ffffff'}>
        <img src="/icons/Google_G_Logo.png" alt="githublogo" width="18px"></img>
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
  );
};

export default OAuth;
