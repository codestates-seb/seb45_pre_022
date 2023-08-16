import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions/Questions';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AskPage from './Pages/AskPage/AskPage';
import Login from './Pages/Logins/Login';
import Signup from './Pages/Logins/Signup';
import UsersPage from './Pages/Users/UsersPage';
import UserList from './Pages/Users/UserList';

const DefaultLayout = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <div
          style={{
            paddingTop: '52px',
            width: '100%',
            height: '100vh',
          }}
        >
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="" element={<Questions />} />
              <Route path="ask" element={<AskPage />} />
              <Route path="members/:membersId" element={<UsersPage />} />
              <Route path="members" element={<UserList />} />
              {/* <Route path="questions/:questionId" element={상세 페이지 컴포넌트.js} /> */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
