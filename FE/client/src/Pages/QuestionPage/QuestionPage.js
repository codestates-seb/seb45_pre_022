import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionPageHeader from './QuestionPageHeader';
import QuestionPageBody from './QuestionPageBody';
import QuestionPageAnswer from './QuestionPageAnswer';
import { styled } from 'styled-components';

const QuestionPageContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const QuestionPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/${questionId}`,
        );
        const question = questionResponse.data;
        setQuestion(question);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };
    fetchData();
  }, []);

  // Loading Indicator 만들기
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionPageContainer>
      <QuestionPageHeader question={question} />
      <QuestionPageBody question={question} />
      <QuestionPageAnswer question={question} setQuestion={setQuestion} />
    </QuestionPageContainer>
  );
};

export default QuestionPage;
