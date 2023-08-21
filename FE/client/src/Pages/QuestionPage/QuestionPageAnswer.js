import { useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { StyledButton as Button } from '../../components/Buttons/AskButton';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getCookieValue } from '../../custom/getCookie';
import { useSelector } from 'react-redux';

const AnswersContainer = styled.div`
  margin-top: 20px;
`;

const LetterPart = styled.h3`
  font: 45px;
  font-weight: 500;
`;

const Answers = styled.div`
  padding: 20px;
  margin-top: 10px;
  line-height: 2;
  width: 85%;
`;

const Comments = styled.div`
  padding: 10px 20px;
  margin-top: 10px;
  line-height: 2;
`;

const When = styled.div`
  display: flex;
  font-size: 15px;
  color: gray;
  p {
    margin-right: 10px;
  }
`;

const YourAnswer = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 150px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #c7c7c7;
  padding: 10px;
`;

const QuestionPageAnswer = ({ question, setQuestion, isEditing }) => {
  const memberId = useSelector((state) => state.login.memberId);
  const displayName = useSelector((state) => state.login.displayName);

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [answerText, setAnswerText] = useState('');

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/answers`,
        {
          questionId: question.questionId,
          memberId: question.memberId,
          body: answerText,
        },
        { headers },
      );

      const newAnswer = {
        answerId: response.data.answerId,
        memberId: memberId,
        displayName: displayName,
        body: response.data.body,
        createdAt: response.data.createdAt,
        lastModifiedAt: response.data.lastModifiedAt,
        comments: [],
      };

      const updatedAnswers = [...question.answers, newAnswer];
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: updatedAnswers,
      }));

      setAnswerText('');
    } catch (error) {
      console.error('Post error', error);
      console.log('Error response:', error.response);
    }
  };
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AnswersContainer>
        <LetterPart>
          {question.answers.length}
          {question.answers.length < 2 ? ' Answer' : ' Answers'}
        </LetterPart>

        {question.answers.map((answer) => (
          <Answers key={answer.answerId}>
            <p>{answer.body}</p>
            <When>
              <p>answered {moment.utc(answer.createdAt).local().fromNow()}</p>
              <p>
                edited {moment.utc(answer.lastModifiedAt).local().fromNow()}
              </p>
              <p> {answer.displayName}</p>
            </When>
            {answer.comments.map((comment) => (
              <Comments key={comment.commentId}>
                <p>{comment.body}</p>
                <When>
                  <p>
                    answered {moment.utc(comment.createdAt).local().fromNow()}
                  </p>
                  <p>
                    edited{' '}
                    {moment.utc(comment.lastModifiedAt).local().fromNow()}
                  </p>
                  <p> {comment.displayName}</p>
                </When>
              </Comments>
            ))}
            <Link></Link>
          </Answers>
        ))}
      </AnswersContainer>

      <LetterPart>Your Answer</LetterPart>
      <YourAnswer
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <Button onClick={handleAnswerSubmit}>Post Your Answer</Button>
    </>
  );
};

export default QuestionPageAnswer;
