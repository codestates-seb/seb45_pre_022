import { styled } from 'styled-components';

// 태그 스타일
export const Tag = styled.div`
  display: inline-flex;
  background-color: #e1ecf4;
  color: #39739d;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #c9dce8;
  }

  &:active,
  &:focus {
    background-color: #a9c9d9;
  }
`;
