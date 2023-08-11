import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { styled } from 'styled-components';
import Header from './components/Header';
import Questions from './components/Questions/Questions';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AskPage from './Pages/AskPage/AskPage';

const MainContainer = styled.div`
  display: flex;
`;

const DefaultLayout = () => {
  return (
    <MainContainer>
      <Sidebar />
      <Questions />
    </MainContainer>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/ask" element={<AskPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
