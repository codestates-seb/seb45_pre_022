import { styled } from 'styled-components';

// 태그 스타일
export const Tag = styled.div`
  font-size: 12px;
  padding: 5px;
  margin-right: 5px;
  background-color: #e1ecf4;
  color: #39739d;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #c9dce8;
  }

  &:active,
  &:focus {
    background-color: #a9c9d9;
  }
`;
