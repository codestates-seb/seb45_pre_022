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
  width: 611px;
`;

const QuestionTitle = styled.div`
  margin-bottom: 5px;
  font-size: 17px;
  color: #0074cc;
  font-weight: 600;
`;

const EllipsisText = styled.div`
  display: -webkit-box;
  overflow: hidden;
  max-height: ${(props) => props.maxLine * props.lineHeight}px;
  -webkit-line-clamp: ${(props) => props.maxLine};
  -webkit-box-orient: vertical;
  line-height: ${(props) => props.lineHeight}px;
`;

const QuestionContent = styled(EllipsisText)``;

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
        <QuestionContent maxLine={2} lineHeight={20}>
          컴포넌트를 분할하고 폴더를 옮겼는데 갑자기 오류가 발생했습니다. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Iure, repellat
          quis, totam nam inventore est possimus ea sunt non velit quo animi
          error autem iusto deleniti vitae perferendis corrupti quibusdam!
        </QuestionContent>
      </QuestionSummary>
    </QuestionContainer>
  );
};

export default Question;
