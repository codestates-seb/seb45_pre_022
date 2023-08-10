import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Questions from './components/Questions';
import Question from './components/Question';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <header style={{ backgroundColor: 'red' }}>header</header>
      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="/questions/:id" element={<Question />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
