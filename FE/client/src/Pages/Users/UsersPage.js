import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const { membersId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-39-189-62.ap-northeast-2.compute.amazonaws.com:8080/members/${membersId}`,
      )
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [membersId]);

  if (!user) {
    return <div>loading...</div>;
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
