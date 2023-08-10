import Question from './Question';
import QuestionsTopBar from './QuestionsTopBar';
import { styled } from 'styled-components';

const MainContainer = styled.div`
  padding: 24px;
`;

const Questions = () => {
  return (
    <MainContainer>
      <QuestionsTopBar />
    </MainContainer>
  );
};

export default Questions;
