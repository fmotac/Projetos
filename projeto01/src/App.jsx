import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

const App = () => {
  return (
    <Router>
      <nav style={{display:'flex', justifyContent:'center'}}>
        <ul style={{display:'flex', listStyle:'none'}}>
          <li><Link to="/">Home | </Link></li>
          <li><Link to="/courses">Courses |</Link></li>
          <li><Link to="/about">About Us | </Link></li>
          <li><Link to="/contact">Contact | </Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
