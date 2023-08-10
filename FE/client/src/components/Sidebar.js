import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

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
  padding: 4px 4px 4px 30px;
  list-style: none;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }

  &:active {
    font-weight: 600;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Link to="/">
        <SubTitle>Home</SubTitle>
      </Link>
      <SubTitle>PUBLIC</SubTitle>
      <ul>
        <Element>Questions</Element>
        <Element>Tags</Element>
        <Element>Users</Element>
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
