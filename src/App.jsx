import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Timer from './components/Timer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function Home() {
  return (
    <>

      <div className="auth-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <h1>Timesheet Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/timer"
            element={
              <ProtectedRoute>
                <Timer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/:userId" // Assuming you use userId in the route
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;