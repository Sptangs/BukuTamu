import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from "./components/Header";
import Footer from "./components/foter"; // Corrected import
import Home from "./components/home";     // Corrected import
import SideNav from "./components/sideNav";  // Corrected import
import BukuTamu from './components/table';  // Corrected import
import UsersTable  from "./components/user";

function App() {
  return (
    <Router>
      <div className='wrapper'>
        <SideNav />
        <div className='main-content'>
          <Header />
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bukutamu" element={<BukuTamu />} />
              <Route path="/users" element={<UsersTable  />} />
              {/* Add more routes here as needed */}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
