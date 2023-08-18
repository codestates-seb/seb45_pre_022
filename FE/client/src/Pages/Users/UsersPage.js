import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading';
import { getCookieValue } from '../../custom/getCookie';

const Button = styled.button`
  border: 1px solid lightgrey;
  width: 80px;
  height: 40px;
  background-color: white;
  border-radius: 7px;
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
  margin: 4px 4px 12px 4px;
`;

const UsersPage = () => {
  const [user, setUser] = useState(null);

  const accessToken = getCookieValue('access_token');

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
          <UserName>{user.displayName}</UserName>
        </div>
        <Button>Edit Profile</Button>
      </Summary>
    </Container>
  );
};

export default UsersPage;
