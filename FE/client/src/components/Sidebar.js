import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  border-right: 1px solid #e4e6e8;
  height: 100vh;
`;

const SubTitle = styled.div`
  font-size: 13px;
  margin: 16px 0px 4px 8px;
  color: #6a737c;
`;

const Element = styled.li`
  font-size: 13px;
  padding: 4px 10px 4px 20px;
  list-style: none;
  cursor: pointer;
  border-right: 3px solid transparent;

  &:hover {
    text-shadow: 0 0 1px #000;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    border-right-color: #f48024;
    text-shadow: 0 0 1px #000;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LinkStyled to="/">
        <SubTitle>Home</SubTitle>
      </LinkStyled>
      <SubTitle>PUBLIC</SubTitle>
      <ul>
        <LinkStyled to="/questions">
          <Element>Questions</Element>
        </LinkStyled>
        <LinkStyled to="/tags">
          <Element>Tags</Element>
        </LinkStyled>
        <LinkStyled to="/members">
          <Element>Users</Element>
        </LinkStyled>
        <Element>Companies</Element>
      </ul>
      <SubTitle>COLLECTIVES</SubTitle>
      <ul>
        <Element>Explore Collectives</Element>
      </ul>
      <SubTitle>TEAMS</SubTitle>
    </SidebarContainer>
  );
};

export default Sidebar;
