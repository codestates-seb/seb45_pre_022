import { styled } from 'styled-components';
import { AskButton } from '../Buttons/AskButton';

// 제목과 버튼이 있는 컨테이너
const AskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 50px;
  margin-bottom: 12px;
`;

// 제목
const Title = styled.h1`
  font-weight: normal;
  font-size: 27px;
`;

// 필터링 탭과 필터링 버튼이 있는 컨테이너
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  margin-bottom: 12px;
`;

// 현재 글 갯수 카운트
const QuestionsCount = styled.div`
  font-size: 17px;
  width: 250px;
`;

// 필터링 버튼 컨테이너
const TabContainer = styled.div`
  display: flex;
`;

// 필터링 버튼
const Tab = styled.div`
  font-size: 12px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-right: none;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }

  &:active,
  &:focus {
    background-color: #e4e4e4;
  }

  &:first-child {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }

  &:last-child {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    border-right: 1px solid lightgrey;
  }
`;

// 필터 버튼
const Filter = styled.div`
  font-size: 12px;
  padding: 10px;
  background-color: #e1ecf4;
  color: #39739d;
  border-radius: 7px;
`;

const QuestionsTopBar = ({ totalElements }) => {
  return (
    <>
      <AskContainer>
        <Title>All Questions</Title>
        <AskButton>Ask Question</AskButton>
      </AskContainer>
      <FilterContainer>
        {/* 갯수가 1 이하면 question 아니면 questions */}
        {totalElements <= 1 ? (
          <QuestionsCount>{totalElements} question</QuestionsCount>
        ) : (
          <QuestionsCount>{totalElements} questions</QuestionsCount>
        )}
        <TabContainer>
          <Tab>Newest</Tab>
          <Tab>Active</Tab>
          <Tab>Bountied</Tab>
          <Tab>Unanswered</Tab>
          <Tab>More ▼</Tab>
        </TabContainer>
        <Filter>
          <svg
            aria-hidden="true"
            className="svg-icon iconFilter"
            width="12"
            height="12"
            viewBox="0 0 18 18"
          >
            <path d="M2 4h14v2H2V4Zm2 4h10v2H4V8Zm8 4H6v2h6v-2Z"></path>
          </svg>
          Filter
        </Filter>
      </FilterContainer>
    </>
  );
};

export default QuestionsTopBar;
