
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from './pages/Home';
import JobChecker from './pages/JobChecker';
import HomeComp from './comp/HomeComp';
import ResumeChecker from './pages/ResumeChecker';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './comp/Footer';

function App() {
  
  return (
    <div className="App">
      
       <Router>
        <HomeComp />
         <ToastContainer position="top-right" autoClose={3000} />
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/job-checker' element={<JobChecker />} />
          <Route path='/resume-checker' element={<ResumeChecker />} />
          
        </Routes>
        <Footer/>
      </Router>
      
      
     
       
    </div>
  );
}

export default App;
