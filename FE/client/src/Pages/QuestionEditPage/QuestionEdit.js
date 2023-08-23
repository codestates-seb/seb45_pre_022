import { styled } from 'styled-components';
import { getCookieValue } from '../../custom/getCookie';
import axios from 'axios';
import { InputWrapper, StyledInput } from '../AskPage/Contents';
import { useState, useEffect } from 'react';
import { Tag } from '../../components/Buttons/Tags';

//  수정 기능
const Button = styled.button`
  border: none;
  color: darkgray;
  font-size: 13px;
  font-weight:600
  margin-right: 10px;
  padding: 10px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const LetterPart = styled.h4`
  font-weight: 700;
  margin-left: 20px;
`;

const QuestionInput = styled.input`
  margin: 5px 0px 20px 20px;
  padding: 8px;
  border: 1px solid darkgray;
  border-radius: 4px;
  max-width: 800px;
`;

const QuestionContent = styled.textarea`
  margin: 5px 0px 20px 20px;
  padding: 8px;
  border: 1px solid darkgray;
  border-radius: 4px;
  max-width: 800px;
  min-height: 100px;
  resize: vertical;
  overflow: auto;
`;

const TagContainer = styled.div`
  margin: 5px 0px 20px 20px;
  padding: 8px;
  border: 1px solid darkgray;
  border-radius: 4px;
  max-width: 800px;
`;
const QuestionEdit = ({ question, setQuestion }) => {
  const isEditMode = true;
  const [tags, setTags] = useState([]);

  const handleTagInput = (e) => {
    if (e.key === ' ') {
      const newTag = e.target.value.trim();

      if (newTag !== '') {
        setTags([...tags, newTag]);
        e.target.value = '';
      }
    }
  };

  const handleTagDelete = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  useEffect(() => {
    if (question.tags) {
      setTags(question.tags);
    }
  }, [question.tags]);

  const token = getCookieValue('access_token');

  const updatedQuestion = {
    title: question.title,
    body: question.body,
    tags: tags,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    return;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/questions/${question.questionId}`,
        updatedQuestion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      window.alert('게시글이 수정되었습니다.');
      window.location.href = `/questions/${question.questionId}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <EditForm>
        <LetterPart>Title</LetterPart>
        <QuestionInput
          type="text"
          name="title"
          value={question.title}
          onChange={handleInputChange}
        />
        <LetterPart>Body</LetterPart>
        <QuestionContent
          type="text"
          name="body"
          value={question.body}
          onChange={handleInputChange}
        />
        <LetterPart>Tags</LetterPart>
        <TagContainer>
          <InputWrapper>
            {tags.map((tag, index) => (
              <Tag key={index} onClick={() => handleTagDelete(index)}>
                {tag}
              </Tag>
            ))}
            <StyledInput
              type="text"
              placeholder="e.g. (javascript) (react)"
              onKeyDown={handleTagInput}
              disabled={!isEditMode}
            />
          </InputWrapper>
        </TagContainer>
        <Button type="submit" onClick={handleEditSubmit}>
          Save edits
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </EditForm>
    </>
  );
};

export default QuestionEdit;
