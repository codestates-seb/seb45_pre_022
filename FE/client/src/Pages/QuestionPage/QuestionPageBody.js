import { styled } from 'styled-components';
import { Tag } from '../../components/Buttons/Tags';
import QuestionEditPage from '../QuestionEditPage/QuestionEditPage';
import { useSelector } from 'react-redux';
import { getCookieValue } from '../../custom/getCookie';
import axios from 'axios';
import { Button } from './QuestionPageAnswer';

// Question 게시글 Body 부분 (질문 내용, 태그, 작성자)
// 게시글 수정(수정페이지 이동) 및 삭제 기능

const QuestionBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionBody = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 10px;
  line-height: 2;
  width: 90%;
`;

const TagsContainer = styled.div`
  margin: 20px;
`;

const TagWrapper = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

export const AboutWriter = styled.div`
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
  margin-left: 700px;
  background-color: #d4e7f6;
  width: 200px;
  height: 65px;
  border-radius: 5px;
  color: hsl(206, 100%, 40%);
  margin-top: 10px;
  font-weight: 600;
  font-size: 15px;

`;

export const Info=styled.div`
font-size:13px;
font-weight:600;
color:gray;`


const QuestionPageBody = ({ question, isEditing, setIsEditing }) => {
  const { isLogin } = useSelector((state) => state.login);
  const loggedInMemberId = useSelector((state) => state.login.memberId);
  
  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleEdit = () => {
    if (!isLogin) {
      alert('게시물을 삭제하려면 로그인이 필요합니다.');
      window.location.href = '/login';
    } else if (loggedInMemberId === question.memberId) {
      setIsEditing(true);
    } else {
      alert('게시물을 수정할 수 있는 권한이 없습니다.');
      return;
    }
  };

  const handleDelete = () => {
    if (!isLogin) {
      alert('게시물을 삭제하려면 로그인이 필요합니다.');
      window.location.href = '/login';
    } else if (loggedInMemberId === question.memberId) {
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        try {
          axios.delete(
            `${process.env.REACT_APP_API_URL}/questions/${question.questionId}`,
            { headers },
          );
          alert('게시물이 삭제되었습니다.');
          window.location.href = '/';
        } catch (error) {
          console.error('Delete Error',error);
        }
      }
    } else {
      alert('게시물을 삭제할 수 있는 권한이 없습니다.');
    }
  };
  return (
    <QuestionBodyContainer>
      {isEditing ? (
        <QuestionEditPage />
      ) : (
        <>
          <QuestionBody>{question.body}</QuestionBody>
          <TagsContainer>
            {question.tags.map((tag) => (
              <TagWrapper key={tag}>
                <Tag>{tag}</Tag>
              </TagWrapper>
            ))}
          </TagsContainer>

          <AboutWriter>
            <Info>asked: {new Date(question.createdAt).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}</Info>
          <div>
          <img
                    src="/icons/profile.png"
                    alt="user-profile"
                    width="24"
                    height="24"
                  ></img>
          <span> {question.displayName}</span>
          </div>
          </AboutWriter>
          <div>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </>
      )}
    </QuestionBodyContainer>
  );
};

export default QuestionPageBody;
