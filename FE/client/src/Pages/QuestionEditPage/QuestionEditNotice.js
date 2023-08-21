import { styled } from 'styled-components';

const NoticeBox = styled.div`
  padding: 20px;
  margin: 20px;
  border: 2px solid #e3c86e;
  border-radius: 7px;
  background-color: #fef6de;
  max-width: 500px;
  font-weight: 350;
  font-size: 13px;
  line-height: 1.3;
  word-spacing: 2;
  width: 100%;
  p {
    margin-bottom: 20px;
  }
`;
const QuestionEditNotice = () => {
  return (
    <NoticeBox>
      <p>Your edit will be placed in a queue until it is peer reviewed.</p>
      <p>
        We welcome edits that make the post easier to understand and more
        valuable for readers. Because community members review edits, please try
        to make the post substantially better than how you found it, for
        example, by fixing grammar or adding additional resources and
        hyperlinks.
      </p>
    </NoticeBox>
  );
};
export default QuestionEditNotice;
