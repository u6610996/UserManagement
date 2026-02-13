import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import RequireAuth from './middleware/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
      <Route path="/logout" element={
        <RequireAuth>
          <Logout />
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
