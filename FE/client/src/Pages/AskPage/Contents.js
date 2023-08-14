import { useState } from 'react';
import {
  Content,
  SubTitle,
  Description,
  Input,
  NextButton,
  TextArea,
} from './AskPageStyles';
import { styled } from 'styled-components';

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

// 인풋창 안에서 태그를 관리할 스타일을 정의합니다.
const InputWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  height: 35px;
  background-color: white;
`;

// 개별 태그 스타일을 정의합니다.
const Tag = styled.div`
  display: inline-flex;
  background-color: #e1ecf4;
  color: #39739d;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
`;

// 실제 입력을 처리하는 Input 스타일을 정의합니다.
const StyledInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
`;

// TagsContent 컴포넌트를 만들기 위한 함수입니다.
export const TagsContent = ({ currentStep }) => {
  // 사용자가 입력한 태그를 관리하기 위한 state 입니다.
  const [tags, setTags] = useState([]);

  // 사용자가 입력한 태그를 처리하는 함수입니다.
  const handleTagInput = (e) => {
    // 사용자가 스페이스바를 누를 경우
    if (e.key === ' ') {
      // 스페이스바 앞에 입력된 텍스트를 가져옵니다.
      const newTag = e.target.value.trim();

      // 텍스트가 비어있지 않다면 tags 배열에 추가합니다.
      if (newTag !== '') {
        setTags([...tags, newTag]);
        e.target.value = ''; // 입력 창을 비웁니다.
      }
    }
  };

  // 태그를 삭제하는 함수입니다.
  const handleTagDelete = (index) => {
    // 해당 인덱스의 태그를 제외하고 새 배열을 생성합니다.
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Content disabled={currentStep < 3}>
      <SubTitle>tags</SubTitle>
      <Description>
        Add up to 5 tags to describe what your question is about. Start typing
        to see suggestions.
      </Description>
      <InputWrapper>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => handleTagDelete(index)}>
            {tag}
          </Tag>
        ))}
        <StyledInput
          type="text"
          placeholder="e.g. (javascript) (react)"
          onKeyDown={handleTagInput} // 키보드의 키를 누를 때마다 handleTagInput 함수를 호출합니다.
        />
      </InputWrapper>
    </Content>
  );
};
