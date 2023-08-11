import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 질문 버튼
const StyledButton = styled.button`
  background-color: #0a95ff;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 10.4px;
  height: 40px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: #0a84e1;
  }
`;

export const AskButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/ask');
  };

  return <StyledButton onClick={onClick}>Ask Question</StyledButton>;
};
