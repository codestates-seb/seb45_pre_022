import { styled } from 'styled-components';
import { Tag } from '../../components/Buttons/Tags';

const QuestionBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionBody = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 10px;
  line-height: 2;
  width: 90%;
`;

const TagsContainer = styled.div`
  margin: 20px;
`;

const TagWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const AboutWriter = styled.div`
  margin-left: 700px;
  background-color: #d4e7f6;
  width: 200px;
  height: 65px;
  border-radius: 5px;
  color: hsl(206, 100%, 40%);
  margin-top: 10px;
  padding: 10px;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
export const UserImg = styled.img`
  width: 40px;
`;

const QuestionPageBody = ({ question }) => {
  return (
    <QuestionBodyContainer>
      <QuestionBody>{question.body}</QuestionBody>
      <TagsContainer>
        {question.tags.map((tag) => (
          <TagWrapper key={tag}>
            <Tag>{tag}</Tag>
          </TagWrapper>
        ))}
      </TagsContainer>

      <AboutWriter>
        <UserImg
          src="https://item.kakaocdn.net/do/a1866850b14ae47d0a2fd61f409dfc057154249a3890514a43687a85e6b6cc82"
          alt=""
        />
        <Username> {question.displayName}</Username>
      </AboutWriter>
    </QuestionBodyContainer>
  );
};

export default QuestionPageBody;
