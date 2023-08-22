import { styled } from 'styled-components';

export const AnswersContainer = styled.div`
  margin-top: 20px;
`;

export const LetterPart = styled.h3`
  font: 45px;
  font-weight: 500;
`;

export const Answers = styled.div`
  padding: 20px;
  margin-top: 10px;
  line-height: 2;
  width: 85%;
`;

export const Comments = styled.div`
  padding: 10px 20px;
  margin-top: 10px;
  line-height: 2;
`;

export const When = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  color: gray;
  p {
    margin-right: 10px;
  }
`;

export const Button = styled.button`
  border: none;
  color: darkgray;
  font-size: 13px;
  font-weight:600
  margin-right: 10px;
  padding: 10px;
`;

export const Textarea = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #c7c7c7;
  padding: 10px;
  width: 100%;
  height: 150px;
`;

export const User = styled.span`
  background-color: #d4e7f6;
  border-radius: 4px;
  width: content-fit;
  height: content-fit;
  padding: 0px 4px;
  font-weight: 500;
  color: #2176ff;
`;
