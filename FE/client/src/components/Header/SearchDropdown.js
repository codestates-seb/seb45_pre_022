import { styled } from 'styled-components';

const Keyword = styled.div``;

const Description = styled.div``;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1000;
  /* display: none; */
  top: 100%;
  left: 0;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const SearchDropdown = () => {
  return (
    <Dropdown>
      <DropdownContent>
        {/* <Keyword>[tag]</Keyword>
        <Description>search within a tag</Description>
        <Keyword>user:1234</Keyword>
        <Description>search by author</Description>
        <Keyword>"words here"</Keyword>
        <Description>exact phrase</Description>
        <Keyword>collective:"Name"</Keyword>
        <Description>collective content</Description>
        <Keyword>answers:0</Keyword>
        <Description>unanswered questions</Description>
        <Keyword>score:3</Keyword>
        <Description>posts with a 3+ score</Description>
        <Keyword>is:question</Keyword>
        <Description>type of post</Description>
        <Keyword>isaccepted:yes</Keyword>
        <Description>search within status</Description> */}
      </DropdownContent>
    </Dropdown>
  );
};

export default SearchDropdown;
