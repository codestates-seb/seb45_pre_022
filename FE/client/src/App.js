import { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './Loading';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import QuestionEditPage from './Pages/QuestionEditPage/QuestionEditPage';
import NotFound from './NotFound';

const Questions = lazy(() => import('./components/Questions/Questions'));
const AskPage = lazy(() => import('./Pages/AskPage/AskPage'));
const Login = lazy(() => import('./Pages/Logins/Login'));
const Signup = lazy(() => import('./Pages/Logins/Signup'));
const MyPage = lazy(() => import('./Pages/Users/MyPage'));
const UserList = lazy(() => import('./Pages/Users/UserList'));
const QuestionPage = lazy(() => import('./Pages/QuestionPage/QuestionPage'));

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
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route path="" element={<Questions />} />
                <Route path="ask" element={<AskPage />} />
                <Route path="members" element={<UserList />} />
                <Route
                  path="questions/:questionId"
                  element={<QuestionPage />}
                />
                <Route path="mypage" element={<MyPage />} />
                <Route
                  path="questions/:questionId/edit"
                  element={<QuestionEditPage />}
                />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
