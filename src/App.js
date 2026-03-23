
import './App.css';

import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SingupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitlistPage from './Component/WaitListPage';
import { Toaster, toast } from "sonner";

// in App.jsx
<Toaster />

// inside your submit
toast.success("You're on the waitlist 🚀");
toast.error("Something went wrong");

function App() {
  return (
    <div className="App">
      <Router>
     <Toaster position='top-center'/>
        <Routes>
          <Route path="/" element={<WaitlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path ='/waitlist' element={<WaitlistPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
