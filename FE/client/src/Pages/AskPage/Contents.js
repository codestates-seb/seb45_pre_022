import {
  Content,
  SubTitle,
  Description,
  Input,
  NextButton,
  TextArea,
} from './AskPageStyles';

export const TitleContent = ({
  currentStep,
  titleDetails,
  onHandleTitleDetails,
  onHandleNext,
}) => {
  return (
    <Content>
      <SubTitle>Title</SubTitle>
      <Description>
        Be specific and imagine you’re asking a question to another person.
      </Description>
      <Input
        type="text"
        placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        value={titleDetails}
        onChange={onHandleTitleDetails}
      />
      {currentStep === 1 && (
        <NextButton disabled={titleDetails.length === 0} onClick={onHandleNext}>
          Next
        </NextButton>
      )}
    </Content>
  );
};

export const ProblemContent = ({
  currentStep,
  problemDetails,
  onHandleProblemDetails,
  onHandleNext,
}) => {
  return (
    <Content disabled={currentStep < 2}>
      <SubTitle>What are the details of your problem?</SubTitle>
      <Description>
        Introduce the problem and expand on what you put in the title. Minimum
        220 characters.
      </Description>
      <TextArea
        rows="10"
        onChange={onHandleProblemDetails}
        disabled={currentStep < 2}
      />
      {currentStep === 2 && (
        // 220자 미만 작성 시 버튼 비활성화
        <NextButton
          disabled={problemDetails.length < 220}
          onClick={onHandleNext}
        >
          Next
        </NextButton>
      )}
    </Content>
  );
};

export const TagsContent = ({ currentStep, onHandleTags }) => {
  return (
    <Content disabled={currentStep < 3}>
      <SubTitle>tags</SubTitle>
      <Description>
        Add up to 5 tags to describe what your question is about. Start typing
        to see suggestions.
      </Description>
      <Input
        type="text"
        placeholder="e.g. (javascript) (react)"
        onChange={onHandleTags}
      />
    </Content>
  );
};
