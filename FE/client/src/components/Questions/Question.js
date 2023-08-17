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
import moment from 'moment';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Question = () => {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { search } = queryString.parse(location.search);

  useEffect(() => {
    const fetchQuestions = async (page, size = 100) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/questions`,

          {
            params: {
              page,
              size,
              search,
            },
          },
        );
        const sortedQuestions = response.data.questions.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setQuestions(sortedQuestions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions(1);
  }, [search]);

  const onHandleClickUsername = (e) => {
    navigate(`/members/${e.target.id}`);
  };

  return (
    <>
      {questions.map((question) => (
        <QuestionContainer key={question.questionId}>
          <InfoContainer>
            <Info>{question.votes} votes</Info>
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
                {question.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
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
