import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Var from './pages/Var';
import Optimize from './pages/Optimize';
import About from './pages/about/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Var" element={<Var />} />
            <Route path="/Optimize" element={<Optimize />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;