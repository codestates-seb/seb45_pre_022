import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 948px;
  padding: 24px;
`;

const User = styled.div``;

const UserImage = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid red;
`;

const UserName = styled.div``;

const UserFollower = styled.div``;

const UserList = () => {
  return (
    <Container>
      <User>
        <div>
          <UserImage></UserImage>
        </div>
        <div>
          <Link to="/members/1">
            <UserName></UserName>
          </Link>
          <UserFollower></UserFollower>
        </div>
      </User>
    </Container>
  );
};

export default UserList;
