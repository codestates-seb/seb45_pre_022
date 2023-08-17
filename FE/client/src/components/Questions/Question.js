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
import { Link } from 'react-router-dom';

const Question = () => {
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async (page, size = 15) => {
      try {
        const response = await axios.get(
          'http://ec2-13-209-49-128.ap-northeast-2.compute.amazonaws.com:8080/questions',
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

  const onHandleClickUsername = (e) => {
    navigate(`/members/${e.target.id}`);
  };

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
