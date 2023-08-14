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
import axios from 'axios';
import { useState, useEffect } from 'react';

const Question = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async (page, size = 15) => {
      try {
        const response = await axios.get(
          'http://ec2-3-39-189-62.ap-northeast-2.compute.amazonaws.com:8080/questions',
          {
            params: {
              page,
              size,
            },
          },
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions(1);
  }, []);

  return (
    <>
      {questions.map((question) => (
        <QuestionContainer key={question.questionId}>
          <InfoContainer>
            <Info>{question.votes} votes</Info>
            <Info>{question.answers} answers</Info>
            <Info>{question.views} views</Info>
          </InfoContainer>
          <QuestionSummary>
            <QuestionTitle
              to={`/questions/${question.questionId}`}
              activeClassName="active"
            >
              {question.title}
            </QuestionTitle>
            <QuestionContent maxLine={2} lineHeight={20}>
              {question.body}
            </QuestionContent>
            <UserContainer>
              <TagContainer>
                {question.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagContainer>
              <UserInfo>
                <UserName>{question.displayName}</UserName>
                <Follower>{question.follower || 0} followers</Follower>
                <CreatedAt>{question.createdAt}</CreatedAt>
              </UserInfo>
            </UserContainer>
          </QuestionSummary>
        </QuestionContainer>
      ))}
    </>
  );
};

export default Question;
