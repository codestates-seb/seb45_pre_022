// import styled components
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NotFound = () => {
  return (
    <Container>
      <h1>Page not found</h1>
      <p>{`We're sorry, we couldn't find the page you requested.`}</p>
    </Container>
  );
};

export default NotFound;
