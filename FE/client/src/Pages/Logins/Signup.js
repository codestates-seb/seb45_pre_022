import { styled } from 'styled-components';
import OAuth from '../../components/Logins/OAuth';
import { FormLink } from './Login';
import Form from '../../components/Logins/Form';
import LoginAndSignupButton from '../../components/Logins/LoginButton';
import LoginNavBar from '../../components/Logins/LoginNav';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 24px;
  background-color: #f1f2f3;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

const ImgBox = styled.div`
  display: flex;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const [errorDisplayMsg, setErrorDisplayMsg] = useState('');
  const [errorEmailMsg, setErrorEmailMsg] = useState('');
  const [errorPasswordMsg, setErrorPasswordMsg] = useState('');

  const onDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };
  const onEmailChange = (e) => {
    if (e.target.value !== '') {
      setErrorEmailMsg('');
    }
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    if (e.target.value !== '') {
      setErrorPasswordMsg('');
    }
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSignupLoading(true);
    setErrorMsg('');
    setErrorDisplayMsg('');
    setErrorEmailMsg('');
    setErrorPasswordMsg('');

    if (!displayName || !email || !password) {
      if (!displayName) {
        setErrorDisplayMsg('Display name cannot be empty.');
      }
      if (!email) {
        setErrorEmailMsg('Email cannot be empty.');
      }
      if (!password) {
        setErrorPasswordMsg('Password cannot be empty.');
      }
      setIsSignupLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/members`,
        { displayName, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.data === 'success create account') {
        setIsSignupLoading(false);
        alert('회원 등록이 완료되었습니다.');
        navigate('/login');
      }
    } catch (error) {
      const errors = error.response.data.fieldErrors;
      if (errors) {
        for (let i = 0; i < errors.length; i++) {
          if (errors[i].field === 'displayName') {
            setErrorDisplayMsg(errors[i].reason);
          } else if (errors[i].field === 'email') {
            setErrorEmailMsg(errors[i].reason);
          } else if (errors[i].field === 'password') {
            setErrorPasswordMsg(errors[i].reason);
          }
        }
      }
      if (error.response.status === 409) {
        setErrorMsg('이미 존재하는 유저입니다.');
      }
      setIsSignupLoading(false);
    }
  };

  return (
    <MainContainer>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundColor: '#f1f2f3',
            marginBottom: '128px',
            marginRight: '48px',
          }}
        >
          <h1
            style={{
              fontSize: '27px',
              fontWeight: '400',
              lineHeight: '27px',
              marginBottom: '32px',
            }}
          >
            Join the Stack Overflow community
          </h1>
          <FlexRow>
            <ImgBox>
              <svg
                width="26"
                height="26"
                style={{ fill: '#0995FF', marginRight: '8px' }}
              >
                <path
                  opacity=".5"
                  d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
                />
                <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z" />
              </svg>
            </ImgBox>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '20px',
              }}
            >
              Get unstauck - ask a question
            </div>
          </FlexRow>
          <FlexRow>
            <div>
              <svg
                width="26"
                height="26"
                style={{ fill: '#0995FF', marginRight: '8px' }}
              >
                <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
                <path
                  opacity=".5"
                  d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '20px',
              }}
            >
              Unlock new privileges like votin and commenting
            </div>
          </FlexRow>
          <FlexRow>
            <div>
              <svg
                width="26"
                height="26"
                style={{ fill: '#0995FF', marginRight: '8px' }}
              >
                <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z" />
                <path
                  opacity=".5"
                  d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '20px',
              }}
            >
              Save your favorite questions, answer, watch tags, and more
            </div>
          </FlexRow>
          <FlexRow>
            <div>
              <svg
                width="26"
                height="26"
                style={{ fill: '#0995FF', marginRight: '8px' }}
              >
                <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z" />
              </svg>
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '20px',
              }}
            >
              Earn requtation and badges
            </div>
          </FlexRow>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '400',
              lineHeight: '17px',
              color: '#6a737c',
            }}
          >
            Collaborate and share knowledge with a private group for FREE.
            <br />
            <FormLink>
              Get Stack Overflow for Teams free for up to 50 users.
            </FormLink>
          </div>
        </div>
        <div>
          <OAuth situation="Sign up" />
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '5px',
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <FormContainer onSubmit={onSubmit}>
              <Form
                label="Display name"
                size="21"
                onChange={onDisplayNameChange}
                errorMsg={errorDisplayMsg}
              />
              <Form
                label="Email"
                size="21"
                onChange={onEmailChange}
                errorMsg={errorEmailMsg}
              />
              <Form
                label="Password"
                size="21"
                onChange={onPasswordChange}
                errorMsg={errorPasswordMsg}
              />
              <LoginAndSignupButton
                text="Sign up"
                isLoading={isSignupLoading}
              />
              {errorMsg ? <div>{errorMsg}</div> : null}
            </FormContainer>
            <LoginNavBar situation="Sign up" />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Signup;
