import Question from './Question';
import QuestionsTopBar from './QuestionsTopBar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const MainContainer = styled.div`
  padding: 24px;
`;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  const location = useLocation();
  const { search } = queryString.parse(location.search);

  useEffect(() => {
    const fetchQuestions = async (page = 1, size = 10000) => {
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
        setQuestions(response.data.questions);
        setTotalElements(response.data.pageInfo.totalElements);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <MainContainer>
      <QuestionsTopBar totalElements={totalElements} />
      <Question questions={questions} />
    </MainContainer>
  );
};

export default Questions;
