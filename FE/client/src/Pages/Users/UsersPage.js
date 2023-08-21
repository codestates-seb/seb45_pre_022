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

const TestImage = styled.div`
  width: 128px;
  height: 128px;
  border: 1px solid red;
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

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const accessToken = getCookieValue('access_token');

  const onHandleEdit = () => {
    setIsEdit(true);
  };

  const onCloseEdit = () => {
    setIsEdit(false);
  };

  useEffect(() => {
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
          <TestImage />
          <UserInfo>
            <UserName>{user.displayName}</UserName>
            <div>Email: {user.email}</div>
            <div>Total Questions: {user.totalQuestions}</div>
            <div>Total Answers: {user.totalAnswers}</div>
          </UserInfo>
        </div>
        {!isEdit ? (
          <Button onClick={onHandleEdit}>Edit Profile</Button>
        ) : (
          <Button onClick={onCloseEdit}>Close</Button>
        )}
      </Summary>
      {isEdit ? (
        <EditContainer>
          <div>
            <h3>Display Name</h3>
            <input
              type="text"
              value={user.displayName}
              style={{
                width: '300px',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid gray',
                margin: '10px 0',
              }}
            />
          </div>
          <StyledButton>Save Profile</StyledButton>
        </EditContainer>
      ) : null}
    </Container>
  );
};

export default MyPage;
