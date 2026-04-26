
import './App.css';
import { useEffect } from 'react';
import HomePage from './Component/HomePage';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SingupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitlistPage from './Component/WaitListPage';
import { Toaster, toast } from "sonner";
import VerifyEmail from './Component/VerifyEmail';
import CreateProfile from './Component/CreateProfile';
import Dashboard from './Component/Dashboard';
import CreatorPage from './Component/CreatorPage';
import OnboardingStepOne from './Component/OnboardingStepOne';
import PublicRoute from './Component/Protected/PublicRoute';
import ProtectedRoute from './Component/Protected/ProtectedRoute';
import ForgotPassword from './Component/Forgotpassword';
import ResetPassword from './Component/ResetPassword';
import FindCreators from './Component/FindCreators';
import { getCurrentUser } from './Redux/Asycthunk';
import { useDispatch } from 'react-redux';

const token = localStorage.getItem("token");
// in App.jsx
<Toaster />

const updateActivity = () => {
  localStorage.setItem("lastActivity", Date.now());
};

// inside your submit
toast.success("You're on the waitlist 🚀");
toast.error("Something went wrong");

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const checkUser = async () => {
    if (!token) return;

    try {
await dispatch(getCurrentUser()).unwrap();
    } catch (err) {
    
      if (err === "User not found") {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  checkUser();
}, [dispatch,]);

useEffect(() => {
  const events = ["mousemove", "keydown", "click", "scroll"];

  events.forEach((event) =>
    window.addEventListener(event, updateActivity)
  );

  return () => {
    events.forEach((event) =>
      window.removeEventListener(event, updateActivity)
    );
  };
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const lastActivity = localStorage.getItem("lastActivity");

    if (!lastActivity) return;

    const now = Date.now();
    const diff = now - Number(lastActivity);

    const HOURS_24 = 24 * 60 * 60 * 1000;

    if (diff > HOURS_24) {
      console.log("User inactive → logging out");

      localStorage.clear();
      window.location.href = "/login";
    }
  
  }, 60000); // check every 1 minute

  return () => clearInterval(interval);
}, []);


  return (
    <div className="App">
      <Router>
        <Toaster position="top-center" />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />

          <Route path="/waitlist" element={<WaitlistPage />} />

          <Route path="/verify-email/" element={<VerifyEmail />} />

          <Route path="/creator/:username" element={<CreatorPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
                 <Route path="/find-creators" element={<FindCreators />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/onboarding-step-one"
            element={
              <ProtectedRoute>
                <OnboardingStepOne />
              </ProtectedRoute>
            }
          />

          <Route
            path="/onboarding-step-two"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
