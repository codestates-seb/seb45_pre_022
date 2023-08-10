import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { styled } from 'styled-components';
import Header from './components/Header';
import Questions from './components/Questions/Questions';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const MainContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainContainer>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Questions />} />
        </Routes>
      </MainContainer>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
