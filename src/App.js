
import './App.css';
import HomePage from './Component/HomePage';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SingupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitlistPage from './Component/WaitListPage';
import { Toaster, toast } from "sonner";
import VerifyEmail from './Component/VerifyEmail';
import CreateProfile from './Component/CreateProfile';
import Dashboard from './Component/Dashbord';
import CreatorPage from './Component/CreatorPage';
import OnboardingStepOne from './Component/OnboardingStepOne';
import PublicRoute from './Component/Protected/PublicRoute';
import ProtectedRoute from './Component/Protected/ProtectedRoute';

// in App.jsx
<Toaster />

// inside your submit
toast.success("You're on the waitlist 🚀");
toast.error("Something went wrong");

function App() {
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
            path="/create-creator-profile"
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
