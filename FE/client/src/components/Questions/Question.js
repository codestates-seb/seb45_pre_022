import { Tag } from '../Buttons/Tags';
import {
  QuestionContainer,
  InfoContainer,
  Info,
  QuestionSummary,
  QuestionTitle,
  QuestionContent,
  UserContainer,
  TagContainer,
  UserInfo,
  UserName,
  Follower,
  CreatedAt,
} from './QuestionPageStyles';
import moment from 'moment';
import { useNavigate } from 'react-router';

const Question = ({ questions }) => {
  const navigate = useNavigate();

  const onHandleClickUsername = (e) => {
    navigate(`/members/${e.target.id}`);
  };

  return (
    <>
      {questions.map((question, index) => (
        <QuestionContainer key={index}>
          <InfoContainer>
            {/* <Info>{question.votes} votes</Info> */}
            <Info>{question.answerCount} answers</Info>
            <Info>{question.views} views</Info>
          </InfoContainer>
          <QuestionSummary>
            <QuestionTitle to={`/questions/${question.questionId}`}>
              {question.title}
            </QuestionTitle>
            <QuestionContent $maxLine={2} $lineHeight={20}>
              {question.body}
            </QuestionContent>
            <UserContainer>
              <TagContainer>
                {question.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagContainer>
              <UserInfo>
                <UserName
                  id={question.memberId}
                  onClick={onHandleClickUsername}
                >
                  {question.displayName}
                </UserName>
                <Follower>{question.follower || 0}</Follower>
                <CreatedAt>
                  {moment.utc(question.createdAt).local().fromNow()}
                </CreatedAt>
              </UserInfo>
            </UserContainer>
          </QuestionSummary>
        </QuestionContainer>
      ))}
    </>
  );
};

export default Question;
