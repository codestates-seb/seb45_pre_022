import { styled } from 'styled-components';
import {
  Textarea,
  When,
  User,
} from '../../Pages/QuestionPage/QuestionsPageStyles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { getCookieValue } from '../../custom/getCookie';

const CommentButton = styled.button`
  border: none;
  color: darkgray;
  font-size: 13px;
  font-weight:600
  margin-right: 10px;
  padding: 10px;
`;

const Comment = ({ question, setQuestion, comment }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  const { isLogin, memberId } = useSelector((state) => state.login);

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleEditComment = (comment) => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (comment.memberId !== memberId) {
      alert('작성자만 댓글을 수정할 수 있습니다.');
      return;
    }

    setEditingCommentId(comment.commentId);
    setCommentContent(comment.body);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setCommentContent('');
  };

  const handleSaveCommentEdits = async (editedComment) => {
    if (commentContent === editedComment.body) {
      return;
    } else {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/comments/${editedComment.commentId}`,
          {
            body: commentContent,
          },
          { headers },
        );

        const updatedAnswers = question.answers.map((a) => ({
          ...a,
          comments: a.comments.map((c) =>
            c.commentId === editedComment.commentId
              ? {
                  ...c,
                  body: response.data.body,
                  lastModifiedAt: response.data.lastModifiedAt,
                }
              : c,
          ),
        }));

        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          answers: updatedAnswers,
        }));

        setEditingCommentId(null);
        setCommentContent('');
      } catch (error) {
        console.error('Edit Comment Error', error);
      }
    }
  };

  const handleDeleteComment = async (comment) => {
    if (!isLogin) {
      alert('댓글을 삭제하려면 로그인이 필요합니다.');
      return;
    }

    if (memberId === comment.memberId) {
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_API_URL}/comments/${comment.commentId}`,
            { headers },
          );

          const updatedAnswers = question.answers.map((a) => ({
            ...a,
            comments: a.comments.filter(
              (c) => c.commentId !== comment.commentId,
            ),
          }));

          setQuestion((prevQuestion) => ({
            ...prevQuestion,
            answers: updatedAnswers,
          }));

          window.alert('댓글이 삭제되었습니다.');
        } catch (error) {
          console.error('Delete Comment Error', error);
        }
      }
    } else {
      alert('댓글을 삭제할 수 있는 권한이 없습니다.');
    }
  };
  return editingCommentId === comment.commentId ? (
    <div>
      <Textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <CommentButton onClick={() => handleSaveCommentEdits(comment)}>
        Save Edits
      </CommentButton>
      <CommentButton onClick={handleCancelEditComment}>Cancel</CommentButton>
    </div>
  ) : (
    <>
      <p>{comment.body}</p>
      <When>
        <p>answered {moment.utc(comment.createdAt).local().fromNow()}</p>
        <p>edited {moment.utc(comment.lastModifiedAt).local().fromNow()}</p>
        <User>{comment.displayName}</User>
      </When>
      {isLogin && memberId === comment.memberId && (
        <>
          <CommentButton onClick={() => handleEditComment(comment)}>
            Edit
          </CommentButton>
          <CommentButton onClick={() => handleDeleteComment(comment)}>
            Delete
          </CommentButton>
        </>
      )}
    </>
  );
};

export default Comment;
