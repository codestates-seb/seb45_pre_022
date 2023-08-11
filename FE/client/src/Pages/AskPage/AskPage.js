import { useState } from 'react';
import {
  MainContainer,
  TitleContainer,
  Title,
  Notice,
  ContentsContainer,
  DiscardButton,
} from './AskPageStyles';
import {
  TitleContent,
  ProblemContent,
  TryContent,
  TagsContent,
} from './Contents';

const AskPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [titleDetails, setTitleDetails] = useState('');
  const [problemDetails, setProblemDetails] = useState('');
  const [tryDetails, setTryDetails] = useState('');
  const [tags, setTags] = useState([]);

  const onHandleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onHandleTitleDetails = (e) => {
    setTitleDetails(e.target.value);
  };

  const onHandleProblemDetails = (e) => {
    setProblemDetails(e.target.value);
  };

  const onHandleTryDetails = (e) => {
    setTryDetails(e.target.value);
  };

  const onHandleTags = (e) => {
    setTags(e.target.value);
  };

  const onDiscardButton = () => {
    setTitleDetails('');
    setProblemDetails('');
    setTryDetails('');
    setTags([]);
    setCurrentStep(1);
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
        <TryContent
          currentStep={currentStep}
          tryDetails={tryDetails}
          onHandleTryDetails={onHandleTryDetails}
          onHandleNext={onHandleNext}
        />
        <TagsContent
          currentStep={currentStep}
          tags={tags}
          onHandleTags={onHandleTags}
          onHandleNext={onHandleNext}
        />
        <DiscardButton onClick={onDiscardButton}>Discard draft</DiscardButton>
      </ContentsContainer>
    </MainContainer>
  );
};

export default AskPage;
