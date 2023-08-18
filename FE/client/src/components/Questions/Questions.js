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

const Button = styled.button`
  &:hover {
    background-color: gray;
  }

  &active {
    background-color: #f48225;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  margin: 0 4px;
  padding: 4px 8px;
  border: none;
  background-color: ${({ active }) => (active ? '#f48225' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  &:hover {
    background-color: ${({ active }) => (active ? '#f48225' : 'gray')};
    color: white;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(totalElements / itemsPerPage);
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 4);
    i <= Math.min(totalPages, currentPage + 4);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <MainContainer>
      <QuestionsTopBar totalElements={totalElements} />
      <Question questions={questions} />
      <PaginationContainer>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          이전
        </PaginationButton>
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= totalElements}
        >
          다음
        </PaginationButton>
      </PaginationContainer>
    </MainContainer>
  );
};

export default Questions;
