import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Questions from './components/Questions';
import Question from './components/Question';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
      <footer style={{ backgroundColor: 'gray' }}>footer</footer>
    </BrowserRouter>
  );
}

export default App;
