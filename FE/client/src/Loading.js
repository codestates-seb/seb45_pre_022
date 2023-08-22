import { styled, keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50%;
`;

const Spinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #000;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Loading = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

export default Loading;
