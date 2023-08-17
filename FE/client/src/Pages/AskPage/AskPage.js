import { useState } from 'react';
import {
  MainContainer,
  TitleContainer,
  Title,
  Notice,
  ContentsContainer,
  DiscardButton,
  PostButton,
} from './AskPageStyles';
import { TitleContent, ProblemContent, TagsContent } from './Contents';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookieValue } from '../../custom/getCookie';

const AskPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [titleDetails, setTitleDetails] = useState('');
  const [problemDetails, setProblemDetails] = useState('');
  const [tags, setTags] = useState([]);

  const accessToken = getCookieValue('access_token');

  const memberId = useSelector((state) => state.login.memberId);

  const navigate = useNavigate();

  const onHandleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onHandleTitleDetails = (e) => {
    setTitleDetails(e.target.value);
  };

  const onHandleProblemDetails = (e) => {
    setProblemDetails(e.target.value);
  };

  const onDiscardButton = () => {
    setTitleDetails('');
    setProblemDetails('');
    setTags([]);
    setCurrentStep(1);
  };

  const onPostButton = async () => {
    const questionDetails = {
      memberId: memberId,
      title: titleDetails,
      body: problemDetails,
      tags: tags,
    };

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      // navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/questions`,
        questionDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      navigate(`/questions/${response.data.questionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <TitleContainer>
        <Title>
          <h1>Review your question</h1>
        </Title>
        <Notice>
          <h2>Writing a good question</h2>
          <div>
            <p>
              You’re ready to ask a programming-related question and this form
              will help guide you through the process.
            </p>
            <p>
              Looking to ask a non-programming question? See the topics here to
              find a relevant site.
            </p>
          </div>
          <ul>
            <div>Steps</div>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </Notice>
      </TitleContainer>
      <ContentsContainer>
        <TitleContent
          currentStep={currentStep}
          titleDetails={titleDetails}
          onHandleTitleDetails={onHandleTitleDetails}
          onHandleNext={onHandleNext}
        />
        <ProblemContent
          currentStep={currentStep}
          problemDetails={problemDetails}
          onHandleProblemDetails={onHandleProblemDetails}
          onHandleNext={onHandleNext}
        />
        <TagsContent
          currentStep={currentStep}
          tags={tags}
          setTags={setTags}
          onHandleNext={onHandleNext}
        />
        <div style={{ display: 'flex' }}>
          <PostButton onClick={onPostButton}>Post your question</PostButton>
          <DiscardButton onClick={onDiscardButton}>Discard draft</DiscardButton>
        </div>
      </ContentsContainer>
    </MainContainer>
  );
};

export default AskPage;
