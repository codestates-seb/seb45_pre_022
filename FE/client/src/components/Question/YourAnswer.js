import {
  LetterPart,
  Textarea,
} from '../../Pages/QuestionPage/QuestionsPageStyles';
import { StyledButton } from '../Buttons/AskButton';
import { useState } from 'react';
import { getCookieValue } from '../../custom/getCookie';
import axios from 'axios';
import { useSelector } from 'react-redux';

const YourAnswer = ({ question, setQuestion }) => {
  const [answerText, setAnswerText] = useState('');

  const { memberId, displayName } = useSelector((state) => state.login);

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/answers`,
        {
          questionId: question.questionId,
          memberId: memberId,
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
    }
  };

  return (
    <>
      <LetterPart>Your Answer</LetterPart>
      <Textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <StyledButton onClick={handleAnswerSubmit}>Post Your Answer</StyledButton>
    </>
  );
};

export default YourAnswer;
