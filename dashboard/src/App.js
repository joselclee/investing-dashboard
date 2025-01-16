import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Var from './pages/Var'
import Optimize from './pages/Optimize'
import About from './pages/About'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Var" element={<Var />}/>
          <Route path="Optimize" element={<Optimize />}/>
          <Route path="About" element={<About />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
