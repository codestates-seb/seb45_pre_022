import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions/Questions';
import Question from './components/Questions/Question';

import Signup from './components/Logins/Signup';
import Login from './components/Logins/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Questions />} />
        {/* <Route path="/questions/:id" element={<Question />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
