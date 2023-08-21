import { useState, useRef } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { StyledButton } from '../../components/Buttons/AskButton';
import moment from 'moment';
import { getCookieValue } from '../../custom/getCookie';
import { useSelector } from 'react-redux';

// Question 게시글에 대한 Answers, Comments 조회
// Answers, Comments 수정 및 삭제 기능
// Your Answer post 기능 (로그인 상태만)

const AnswersContainer = styled.div`
  margin-top: 20px;
`;

const LetterPart = styled.h3`
  font: 45px;
  font-weight: 500;
`;

const Answers = styled.div`
  padding: 20px;
  margin-top: 10px;
  line-height: 2;
  width: 85%;
`;

const Comments = styled.div`
  padding: 10px 20px;
  margin-top: 10px;
  line-height: 2;
`;

const When = styled.div`
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

// const YourAnswer = styled.textarea`
//   margin: 20px;
//   height: 150px;
//   font-family: Arial, sans-serif;
//   font-size: 16px;
//   border: 1px solid #c7c7c7;
//   padding: 10px;
//   width: 80%;
// `;

const Textarea = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #c7c7c7;
  padding: 10px;
  width: 100%;
  height: 150px;
`;

const User = styled.span`
  background-color: #d4e7f6;
  border-radius: 4px;
  width: content-fit;
  height: content-fit;
  padding: 0px 4px;
  font-weight: 500;
  color: #2176ff;
`;
const QuestionPageAnswer = ({ question, setQuestion }) => {
  // [Create] Your answer 작성하여 Post 요청 보내기
  const memberId = useSelector((state) => state.login.memberId);
  const displayName = useSelector((state) => state.login.displayName);
  const { isLogin } = useSelector((state) => state.login);

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [answerText, setAnswerText] = useState('');

  const handleAnswerSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/answers`,
        {
          questionId: question.questionId,
          memberId: memberId,
          body: answerText,
        },
        { headers },
      );

      const newAnswer = {
        answerId: response.data.answerId,
        memberId: memberId,
        displayName: displayName,
        body: response.data.body,
        createdAt: response.data.createdAt,
        lastModifiedAt: response.data.lastModifiedAt,
        comments: [],
      };

      const updatedAnswers = [...question.answers, newAnswer];
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: updatedAnswers,
      }));

      setAnswerText('');
    } catch (error) {
      console.error('Post error', error);
    }
  };

  // [Update] Answer 수정하기 (작성자만 수정 가능)
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const [showEditMessage, setShowEditMessage] = useState(false);
  const textareaRef = useRef(null);

  const handleEditAnswer = (answer) => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (answer.memberId !== memberId) {
      alert('작성자만 답변을 수정할 수 있습니다.');
      return;
    }
    setEditingAnswerId(answer.answerId);
    setAnswerContent(answer.body);
    setShowEditMessage(false);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCancelEdit = () => {
    setEditingAnswerId(null);
    setAnswerContent('');
    setShowEditMessage(false);
  };

  const handleSaveEdits = async (editedAnswer) => {
    if (answerContent === editedAnswer.body) {
      setShowEditMessage(true);
      return;
    } else {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/answers/${editedAnswer.answerId}`,
          {
            body: answerContent,
          },
          { headers },
        );

        const updatedAnswers = question.answers.map((a) =>
          a.answerId === editedAnswer.answerId
            ? {
                ...a,
                body: response.data.body,
                lastModifiedAt: response.data.lastModifiedAt,
              }
            : a,
        );

        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          answers: updatedAnswers,
        }));

        setEditingAnswerId(null);
        setAnswerContent('');
      } catch (error) {
        console.error('Edit error', error);
      }
    }
  };

  // [Delete] Answer 삭제하기
  const handleDeleteAnswer = (answer) => {
    if (!isLogin) {
      alert('답변을 삭제하려면 로그인이 필요합니다.');
      window.location.href = '/login';
    } else if (memberId === answer.memberId) {
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        try {
          axios.delete(
            `${process.env.REACT_APP_API_URL}/answers/${answer.answerId}`,
            { headers },
          );
          alert('답변이 삭제되었습니다.');
          window.location.href = `/questions/${question.questionId}`;
        } catch (error) {
          console.error('Answer Delete Error', error);
        }
      }
    } else {
      alert('답변을 삭제할 수 있는 권한이 없습니다.');
    }
  };

  // [Create] 댓글 작성하기
  const [addingCommentTo, setAddingCommentTo] = useState(null);
  const [comment, setComment] = useState('');

  const handleAddComment = (answerId) => {
    setAddingCommentTo(answerId);
    setComment('');
  };

  const handleCommentSubmit = async (answer) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comments`,
        {
          answerId: answer.answerId,
          memberId: memberId,
          body: comment,
        },
        { headers },
      );
      console.log('Response from API:', response);

      const newComment = {
        commentId: response.data.commentId,
        memberId: memberId,
        displayName: displayName,
        body: response.data.body,
        createdAt: response.data.createdAt,
        lastModifiedAt: response.data.lastModifiedAt,
      };

      const updatedAnswers = question.answers.map((a) =>
        a.answerId === answer.answerId
          ? {
              ...a,
              comments: [...a.comments, newComment],
            }
          : a,
      );

      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        answers: updatedAnswers,
      }));

      setAddingCommentTo(null);
      setComment('');

      window.alert('답변이 업로드되었습니다.');
    } catch (error) {
      console.error('Comment Post Error', error);
    }
  };

  // [Update] Comment 수정하기 (작성자만 수정 가능)
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState('');

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

  // [Delete] Comment 삭제하기
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

  return (
    <>
      <AnswersContainer>
        {/* 몇 개의 Answer가 있는지 */}
        <LetterPart>
          {question.answers.length}
          {question.answers.length < 2 ? ' Answer' : ' Answers'}
        </LetterPart>

        {/* answers 리스팅하기 */}
        {question.answers.map((answer) => (
          <Answers key={answer.answerId}>
            {editingAnswerId === answer.answerId ? (
              <div>
                <Textarea
                  ref={textareaRef}
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                />
                {showEditMessage && (
                  <p style={{ color: 'red' }}>변경된 내용이 없습니다.</p>
                )}
                <Button onClick={() => handleSaveEdits(answer)}>
                  Save Edits
                </Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>
              </div>
            ) : (
              <>
                <p>{answer.body}</p>
                <When>
                  <p>
                    answered {moment.utc(answer.createdAt).local().fromNow()}
                  </p>
                  <p>
                    edited {moment.utc(answer.lastModifiedAt).local().fromNow()}
                  </p>
                  <User> {answer.displayName}</User>
                </When>
                <Button onClick={() => handleEditAnswer(answer)}>Edit</Button>
                <Button onClick={() => handleDeleteAnswer(answer)}>
                  Delete
                </Button>
                {addingCommentTo === answer.answerId ? (
                  <div>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your comment..."
                    />
                    <Button onClick={() => handleCommentSubmit(answer)}>
                      Add a Comment
                    </Button>
                    <Button onClick={() => setAddingCommentTo(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleAddComment(answer.answerId)}>
                    Add a comment
                  </Button>
                )}
              </>
            )}
            {/* 댓글 리스팅 */}
            {answer.comments.map((comment) => (
              <Comments key={comment.commentId}>
                {editingCommentId === comment.commentId ? (
                  <div>
                    <Textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <Button onClick={() => handleSaveCommentEdits(comment)}>
                      Save Edits
                    </Button>
                    <Button onClick={handleCancelEditComment}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    <p>{comment.body}</p>
                    <When>
                      <p>
                        answered{' '}
                        {moment.utc(comment.createdAt).local().fromNow()}
                      </p>
                      <p>
                        edited{' '}
                        {moment.utc(comment.lastModifiedAt).local().fromNow()}
                      </p>
                      <p> {comment.displayName}</p>
                    </When>
                    {isLogin && memberId === comment.memberId && (
                      <>
                        <Button onClick={() => handleEditComment(comment)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteComment(comment)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Comments>
            ))}
          </Answers>
        ))}
      </AnswersContainer>

      {/* 로그인 상태에만 답변 작성 가능 */}
      {isLogin && (
        <>
          <LetterPart>Your Answer</LetterPart>
          <Textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
          <StyledButton onClick={handleAnswerSubmit}>
            Post Your Answer
          </StyledButton>
        </>
      )}
    </>
  );
};

export default QuestionPageAnswer;
