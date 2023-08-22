import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionPageHeader from '../../components/Question/QuestionPageHeader';
import QuestionPageBody from '../../components/Question/QuestionPageBody';
import QuestionPageAnswer from './QuestionPageAnswer';
import { styled } from 'styled-components';
import Loading from '../../Loading';

// Question 게시글 1개 조회하는 페이지
const QuestionPageContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const QuestionPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/questions/${questionId}`,
        );
        const question = questionResponse.data;
        setQuestion(question);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };
    fetchData();
  }, []);

  if (!question) {
    return <Loading />;
  }
  return (
    <QuestionPageContainer>
      <QuestionPageHeader question={question} isEditing={isEditing} />
      <QuestionPageBody
        question={question}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {!isEditing && (
        <QuestionPageAnswer
          question={question}
          setQuestion={setQuestion}
          isEditing={isEditing}
        />
      )}
    </QuestionPageContainer>
  );
};

export default QuestionPage;
