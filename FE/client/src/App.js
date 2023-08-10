import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions/Questions';
import Question from './components/Questions/Question';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Questions />} />
        {/* <Route path="/questions/:id" element={<Question />} /> */}
      </Routes>
      {/* <footer style={{ backgroundColor: 'gray' }}>footer</footer> */}
    </BrowserRouter>
  );
}

export default App;
