import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionEditNotice from './QuestionEditNotice';
import QuestionEdit from './QuestionEdit';
import QiestionEditHowtoEdit from './QuestionEditHowtoEdit';

const QuestionEditPageStyle = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionEditZone = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionEditPage = () => {
  const { questionId } = useParams();

  const [question, setQuestion] = useState({
    questionId: 0,
    memberId: 0,
    title: '',
    body: '',
    tags: [],
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error('Fetch Error', error);
      });
  }, [questionId]);

  return (
    <QuestionEditPageStyle>
      <QuestionEditZone>
        <QuestionEditNotice />
        <QuestionEdit
          question={question}
          setQuestion={setQuestion}
          questionId={questionId}
        />
      </QuestionEditZone>
      <QiestionEditHowtoEdit />
    </QuestionEditPageStyle>
  );
};
export default QuestionEditPage;
