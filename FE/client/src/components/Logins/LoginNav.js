import { styled } from 'styled-components';
import { FormLink } from '../../Pages/Logins/Login';

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

const LoginNavBar = () => {
  return (
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
  );
};

export default LoginNavBar;
