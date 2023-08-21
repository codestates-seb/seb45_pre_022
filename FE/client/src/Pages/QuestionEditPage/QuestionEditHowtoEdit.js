import { styled } from 'styled-components';
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 2px solid #e3e3e3;
  border-radius: 2px;
  background-color: #faf4dc;
  line-height: 1.3;
  word-spacing: 2;
  width: 300px;
  height: 200px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const Title = styled.div`
  border-bottom: 2px solid #fffae3;
  background-color: #faf1cc;
  padding: 10px;
  margin: 0;
`;

const Content = styled.div`
  margin-top: 10px;
  font-weight: 350;
  font-size: 13px;
  line-height: 1.3;
  word-spacing: 2;
  padding: 10px;
`;
const QiestionEditHowtoEdit = () => {
  return (
    <ContentBox>
      <Title>How to Edit</Title>

      <Content>
        • Correct minor typos or mistakes <br />
        • Clarify meaning without changing it
        <br />
        • Add related resources or links <br />
        • Always respect the author’s intent
        <br />• Don’t use edits to reply to the author
      </Content>
    </ContentBox>
  );
};
export default QiestionEditHowtoEdit;
