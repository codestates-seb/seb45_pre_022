import { styled } from 'styled-components';
import { Tag } from '../../components/Buttons/Tags';
import { Link } from 'react-router-dom';
import QuestionEditPage from '../QuestionEditPage/QuestionEditPage';
import { useSelector } from 'react-redux';
import { getCookieValue } from '../../custom/getCookie';
import { useState } from 'react';
import axios from 'axios';

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

const AboutWriter = styled.div`
  margin-left: 700px;
  background-color: #d4e7f6;
  width: 200px;
  height: 65px;
  border-radius: 5px;
  color: hsl(206, 100%, 40%);
  margin-top: 10px;
  padding: 10px;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
export const UserImg = styled.img`
  width: 40px;
`;

const EditBtn = styled.button``;

const DeleteBtn = styled.button``;

const QuestionPageBody = ({ question, isEditing, setIsEditing }) => {
  const loggedInMemberId = useSelector((state) => state.login.memberId);
  const { isLogin } = useSelector((state) => state.login);

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleEdit = () => {
    if (isLogin) {
      setIsEditing(true);
    } else {
      alert('게시글을 수정하려면 로그인이 필요합니다.');
      window.location.href = '/login';
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
          console.error('Delete Error', error);
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
            <UserImg
              src="https://item.kakaocdn.net/do/a1866850b14ae47d0a2fd61f409dfc057154249a3890514a43687a85e6b6cc82"
              alt=""
            />
            <Username> {question.displayName}</Username>
          </AboutWriter>
          <EditBtn onClick={handleEdit}>Edit</EditBtn>
          <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
        </>
      )}
    </QuestionBodyContainer>
  );
};

export default QuestionPageBody;
