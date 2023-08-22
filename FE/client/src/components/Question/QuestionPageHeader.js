import { styled } from 'styled-components';
import { AskButton } from '../Buttons/AskButton';
import moment from 'moment';

// Question 게시글 관련 정보 표시 헤더 (제목, 작성 및 수정 날짜, 작성자)
const QuestionHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.div`
  color: var(--black-700);
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 5px;
  padding: 10px;
`;

// Question 작성 날짜, 수정일, 뷰
const QuestionInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const Info = styled.span`
  color: black;
  font-size: 14px;
  font-weight: 400;
  margin-right: 10px;
`;

export const Line = styled.div`
  border-top: 1.5px solid #e3e3e3;
  width: 100%;
`;

const QuestionPageHeader = ({ question, isEditing }) => {
  return (
    <>
      {!isEditing && (
        <div>
          <QuestionHeaderContainer>
            <QuestionHeader>
              <QuestionTitle>{question.title}</QuestionTitle>
              <QuestionInfo>
                <Info>
                  Asked: {moment.utc(question.createdAt).local().fromNow()}
                </Info>
                <Info>
                  Modified:{' '}
                  {moment.utc(question.lastModifiedAt).local().fromNow()}
                </Info>
                <Info>Viewed: {question.views}</Info>
              </QuestionInfo>
            </QuestionHeader>
            <AskButton />
          </QuestionHeaderContainer>
          <Line />
        </div>
      )}
    </>
  );
};

export default QuestionPageHeader;
