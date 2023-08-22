import { useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getCookieValue } from '../../custom/getCookie';
import { useSelector } from 'react-redux';
import Comment from '../../components/Question/Comment';
import {
  AnswersContainer,
  LetterPart,
  Answers,
  Comments,
  Button,
  When,
  Textarea,
  User,
} from './QuestionsPageStyles.js';
import YourAnswer from '../../components/Question/YourAnswer';

// Question 게시글에 대한 Answers, Comments 조회
// Answers, Comments 수정 및 삭제 기능
// Your Answer post 기능 (로그인 상태만)

const QuestionPageAnswer = ({ question, setQuestion }) => {
  // [Create] Your answer 작성하여 Post 요청 보내기

  const { isLogin, displayName, memberId } = useSelector(
    (state) => state.login,
  );

  const token = getCookieValue('access_token');
  const headers = {
    Authorization: `Bearer ${token}`,
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

  // const handleSaveCommentEdits = async (editedComment) => {
  //   if (commentContent === editedComment.body) {
  //     return;
  //   } else {
  //     try {
  //       const response = await axios.patch(
  //         `${process.env.REACT_APP_API_URL}/comments/${editedComment.commentId}`,
  //         {
  //           body: commentContent,
  //         },
  //         { headers },
  //       );

  //       const updatedAnswers = question.answers.map((a) => ({
  //         ...a,
  //         comments: a.comments.map((c) =>
  //           c.commentId === editedComment.commentId
  //             ? {
  //                 ...c,
  //                 body: response.data.body,
  //                 lastModifiedAt: response.data.lastModifiedAt,
  //               }
  //             : c,
  //         ),
  //       }));

  //       setQuestion((prevQuestion) => ({
  //         ...prevQuestion,
  //         answers: updatedAnswers,
  //       }));

  //       setEditingCommentId(null);
  //       setCommentContent('');
  //     } catch (error) {
  //       console.error('Edit Comment Error', error);
  //     }
  //   }
  // };

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
                <Comment
                  key={comment.commentId}
                  question={question}
                  setQuestion={setQuestion}
                  comment={comment}
                />
              </Comments>
            ))}
          </Answers>
        ))}
      </AnswersContainer>

      {/* 로그인 상태에만 답변 작성 가능 */}
      {isLogin && <YourAnswer question={question} setQuestion={setQuestion} />}
    </>
  );
};

export default QuestionPageAnswer;
