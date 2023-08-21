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
  font-size: 15px;
  color: gray;
  p {
    margin-right: 10px;
  }
`;

export const Button = styled.button`
  border: none;
  font-size: 12px;
  margin-right: 10px;
  padding: 10px;
`;

const YourAnswer = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 150px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #c7c7c7;
  padding: 10px;
`;

const AnswerComment = styled.textarea`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  border: 1px solid #c7c7c7;
  padding: 10px;
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
                <AnswerComment
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
                  <p> {answer.displayName}</p>
                </When>
                <Button onClick={() => handleEditAnswer(answer)}>Edit</Button>
                <Button onClick={() => handleDeleteAnswer(answer)}>
                  Delete
                </Button>
              </>
            )}
            {/* 댓글 리스팅 */}
            {answer.comments.map((comment) => (
              <Comments key={comment.commentId}>
                <p>{comment.body}</p>
                <When>
                  <p>
                    answered {moment.utc(comment.createdAt).local().fromNow()}
                  </p>
                  <p>
                    edited{' '}
                    {moment.utc(comment.lastModifiedAt).local().fromNow()}
                  </p>
                  <p> {comment.displayName}</p>
                </When>
              </Comments>
            ))}
          </Answers>
        ))}
      </AnswersContainer>

      {/* 로그인 상태에만 답변 작성 가능 */}
      {isLogin && (
        <>
          <LetterPart>Your Answer</LetterPart>
          <YourAnswer
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
