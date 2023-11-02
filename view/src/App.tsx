import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Board from './pages/board/Board';
import WriteBoard from './pages/board/WriteBoard';
import BoardDetail from './pages/board/BoardDetail';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import SignLayout from './layout/SignLayout';
import Profile from './pages/auth/Profile';
import About from './pages/About';
import Notfound from './pages/Notfound';

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="board">
          <Route path="" element={<Board />} />
          <Route path=":id" element={<BoardDetail />} />
          <Route path="write" element={<WriteBoard />} />
        </Route>
        <Route path="auth" element={<SignLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
}

export default App;
