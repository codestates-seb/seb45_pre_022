import { getCookieValue } from '../../custom/getCookie';

// [Create] Your answer 작성하여 Post 요청 보내기
const memberId = useSelector((state) => state.login.memberId);
const displayName = useSelector((state) => state.login.displayName);
const { isLogin } = useSelector((state) => state.login);

const token = getCookieValue('access_token');
const headers = {
  Authorization: `Bearer ${token}`,
};
const [answerText, setAnswerText] = useState('');

export const handleAnswerSubmit = async () => {
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

export const handleEditAnswer = (answer) => {
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

export const handleCancelEdit = () => {
  setEditingAnswerId(null);
  setAnswerContent('');
  setShowEditMessage(false);
};

export const handleSaveEdits = async (editedAnswer) => {
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
export const handleDeleteAnswer = (answer) => {
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
