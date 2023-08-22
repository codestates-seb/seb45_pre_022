import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Keyword = styled.div`
  font-size: 14px;
`;

const Description = styled.div`
  font-size: 12px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  color: #6a737c;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 590px;
  position: fixed;
  top: 54px;
  left: 38%;
  border: 1px solid #d6d9dc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #fff;
  flex-wrap: wrap;
`;

const Hint = styled.ul`
  display: flex;
  padding: 12px 12px 0 12px;
  flex-wrap: wrap;
  flex-direction: column;
  height: 130px;
`;

const Li = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid #d6d9dc;
`;

const SearchDropdown = () => {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DropdownContent>
        <Hint>
          <Li>
            <Keyword>[tag]</Keyword>
            <Description>search within a tag</Description>
          </Li>
          <Li>
            <Keyword>user:1234</Keyword>
            <Description>search by author</Description>
          </Li>
          <Li>
            <Keyword>&quot;words here&quot;</Keyword>
            <Description>exact phrase</Description>
          </Li>
          <Li>
            <Keyword>collective:&quot;Name&quot;</Keyword>
            <Description>collective content</Description>
          </Li>
          <Li>
            <Keyword>answers:0</Keyword>
            <Description>unanswered questions</Description>
          </Li>
          <Li>
            <Keyword>score:3</Keyword>
            <Description>posts with a 3+ score</Description>
          </Li>
          <Li>
            <Keyword>is:question</Keyword>
            <Description>type of post</Description>
          </Li>
          <Li>
            <Keyword>isaccepted:yes</Keyword>
            <Description>search within status</Description>
          </Li>
        </Hint>
        <ButtonContainer>
          <button
            onClick={() => {
              navigate('/ask');
            }}
            style={{
              color: '#39739d',
              backgroundColor: '#e1ecf4',
              padding: '7px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Ask a question
          </button>
          <button
            style={{
              color: '#0074cc',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Search help
          </button>
        </ButtonContainer>
      </DropdownContent>
    </Dropdown>
  );
};

export default SearchDropdown;
