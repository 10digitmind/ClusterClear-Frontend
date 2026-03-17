
import './App.css';

import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SingupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitlistPage from './Component/WaitListPage';

function App() {
  return (
    <div className="App">
      <Router>
     
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
