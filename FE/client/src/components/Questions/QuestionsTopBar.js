import { styled } from 'styled-components';

const AskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 727px;
  height: 50px;
  margin-bottom: 12px;
`;

const AskButton = styled.button`
  background-color: #0a95ff;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 10.4px;
  height: 40px;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 27px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 727px;
`;

const QuestionsCount = styled.div`
  font-size: 17px;
  width: 250px;
`;

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.div`
  font-size: 12px;
  padding: 10px;
  border: 1px solid black;

  &:first-child {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }

  &:last-child {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;

const Filter = styled.div`
  font-size: 12px;
  padding: 10px;
`;

const QuestionsTopBar = () => {
  return (
    <>
      <AskContainer>
        <Title>All Questions</Title>
        <AskButton>Ask Question</AskButton>
      </AskContainer>
      <FilterContainer>
        <QuestionsCount>23,861,736 questions</QuestionsCount>
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
