import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Questions from './components/Questions';
import Question from './components/Question';

function App() {
  return (
    <BrowserRouter>
      <header style={{ backgroundColor: 'red' }}>header</header>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
      <footer style={{ backgroundColor: 'gray' }}>footer</footer>
    </BrowserRouter>
  );
}

export default App;
