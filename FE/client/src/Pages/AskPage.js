import { styled } from 'styled-components';
import { StyledButton } from '../components/Buttons/AskButton';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  width: 1200px;
  height: 130px;
`;

const Notice = styled.div`
  background-color: #ebf4fb;
  padding: 16px;
  border: 1px solid #379fef;
  border-radius: 7px;
  width: 850px;
  margin: 16px 0 24px;

  > div {
    margin: 8px 0;
  }

  > ul > div {
    margin: 8px 0;
    font-weight: 600;
  }

  > ul > li {
    margin-left: 24px;
    font-size: 90%;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  background-color: white;
  width: 850px;
  border-radius: 7px;
  padding: 24px;
  border: 1px solid lightgrey;
  margin-bottom: 10px;
`;

const Description = styled.div`
  margin: 2px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 9px;
  border-radius: 7px;
  border: 1px solid lightgrey;
`;

const NextButton = styled(StyledButton)`
  width: auto;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  resize: vertical;
  overflow: auto;
`;

const AskPage = () => {
  return (
    <MainContainer>
      <TitleContainer>
        <Title>
          <h1>Review your question</h1>
        </Title>
        <Notice>
          <h2>Writing a good question</h2>
          <div>
            <p>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </p>
            <p>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </p>
          </div>
          <ul>
            <div>Steps</div>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </Notice>
      </TitleContainer>
      <ContentsContainer>
        {/* Title */}
        <Content>
          <h2>Title</h2>
          <Description>
            Be specific and imagine you’re asking a question to another person.
          </Description>
          <Input
            type="text"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
          <NextButton>Next</NextButton>
        </Content>
        {/* Problem? */}
        <Content>
          <h2>What are the details of your problem?</h2>
          <Description>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </Description>
          {/* 조절 가능한 Textarea, 기본은 10줄정도 보임 */}
          <TextArea rows="10" /> {/* 여기서 TextArea를 직접 사용합니다 */}
          <NextButton>Next</NextButton>
        </Content>
      </ContentsContainer>
    </MainContainer>
  );
};

export default AskPage;
