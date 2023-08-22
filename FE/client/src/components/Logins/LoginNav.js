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

const LoginNavBar = ({ situation }) => {
  return (
    <LoginNav>
      <div>
        <span>
          {situation === 'Log in'
            ? "Don't you have an account? "
            : 'Already have an account? '}
        </span>
        <FormLink to={situation === 'Log in' ? '/signup' : '/login'}>
          {situation === 'Log in' ? 'Sign up' : 'Log in'}
        </FormLink>
      </div>
      <div>
        <span>{'Are you an employer? '}</span>
        <FormLink>Sign up on Talent</FormLink>
      </div>
    </LoginNav>
  );
};

export default LoginNavBar;
