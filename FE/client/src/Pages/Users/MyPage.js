import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading';
import { getCookieValue } from '../../custom/getCookie';
import { StyledButton } from '../../components/Buttons/AskButton';

const Button = styled.button`
  border: 1px solid lightgrey;
  height: 40px;
  background-color: white;
  border-radius: 7px;
  padding: 7px;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 24px;
  width: 948px;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserImage = styled.div`
  width: 128px;
  height: 128px;
`;

const UserName = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
`;

const EditContainer = styled.div`
  margin: 20px;
`;

const StyledInput = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  margin: 10px 0;
`;

const DeleteProfile = styled(Button)`
  background-color: red;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  bottom: 0;
  margin-left: 10px;
`;

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [password, setPassword] = useState('');

  const accessToken = getCookieValue('access_token');
  const memberId = getCookieValue('memberId');

  const url = `${process.env.REACT_APP_API_URL}/members/${memberId}`;

  const fetchMemberInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/my-page`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleEdit = () => {
    setIsEdit(true);
  };

  const onCloseEdit = () => {
    setIsEdit(false);
  };

  const onHandleDelete = () => {
    axios
      .delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert('프로필이 삭제되었습니다.');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSaveProfile = () => {
    const updatedProfile = {
      memberId: Number(memberId),
      displayName: displayName,
      password: password,
    };

    axios
      .patch(url, updatedProfile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert('수정이 완료되었습니다.');
        setIsEdit(false);
        window.location.reload(); // 페이지 새로고침
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.fieldErrors
        ) {
          const fieldErrors = err.response.data.fieldErrors;
          const errorMessage = fieldErrors
            .map((error) => `${error.field}: ${error.reason}`)
            .join('\n');
          alert(errorMessage);
        } else {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <Container>
      <Summary>
        <div
          style={{
            display: 'flex',
          }}
        >
          <UserImage>
            <img
              src="/icons/profile.png"
              alt="user-profile"
              width="128"
              height="128"
            ></img>
          </UserImage>
          <UserInfo>
            <UserName>{user.displayName}</UserName>
            <div>Email: {user.email}</div>
            <div>Total Questions: {user.totalQuestions}</div>
            <div>Total Answers: {user.totalAnswers}</div>
          </UserInfo>
        </div>
        {!isEdit ? (
          <div>
            <Button onClick={onHandleEdit}>Edit Profile</Button>
            <DeleteProfile onClick={onHandleDelete}>
              Delete Profile
            </DeleteProfile>
          </div>
        ) : (
          <Button onClick={onCloseEdit}>Close</Button>
        )}
      </Summary>
      {isEdit ? (
        <EditContainer>
          <div>
            <h3>Display Name</h3>
            <StyledInput
              type="text"
              placeholder={user.displayName}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <h3>Password</h3>
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <StyledButton onClick={onSaveProfile} disabled={!user}>
            Save Profile
          </StyledButton>
        </EditContainer>
      ) : null}
    </Container>
  );
};

export default MyPage;
