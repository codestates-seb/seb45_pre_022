import { styled } from 'styled-components';

const QuestionContainer = styled.div`
  display: flex;
  width: 727px;
  padding: 16px;
  border-top: 1px solid lightgray;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  text-align: right;
  margin-right: 16px;
  margin-bottom: 4px;
`;

const VoteInfo = styled.div``;

const Info = styled.div`
  color: gray;
`;

const QuestionSummary = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.div`
  margin-bottom: 5px;
  font-size: 17px;
  color: #0074cc;
  font-weight: 600;
`;

const QuestionContent = styled.div``;

const Question = () => {
  return (
    <QuestionContainer>
      <InfoContainer>
        <VoteInfo>{2} votes</VoteInfo>
        <Info>{3} answers</Info>
        <Info>{3} views</Info>
      </InfoContainer>
      <QuestionSummary>
        <QuestionTitle>리액트 컴포넌트에서 문제가 생겼습니다!</QuestionTitle>
        <QuestionContent>
          컴포넌트를 분할하고 폴더를 옮겼는데 갑자기 오류가 발생했습니다.
        </QuestionContent>
      </QuestionSummary>
    </QuestionContainer>
  );
};

export default Question;
