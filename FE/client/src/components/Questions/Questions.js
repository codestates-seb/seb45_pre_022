import Question from './Question';
import QuestionsTopBar from './QuestionsTopBar';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Loading from '../../Loading';

const MainContainer = styled.div`
  padding: 24px;
`;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const location = useLocation();
  const { search } = queryString.parse(location.search);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/questions`,
          {
            params: {
              page: currentPage,
              size: itemsPerPage,
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
  }, [search, currentPage, itemsPerPage]);

  return (
    <MainContainer>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        이전
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage * itemsPerPage >= totalElements}
      >
        다음
      </button>
      <QuestionsTopBar totalElements={totalElements} />
      <Question questions={questions} />
    </MainContainer>
  );
};

export default Questions;
