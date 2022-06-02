import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Main';
import Studentside from './components/Studentside/StudentsideForm';
import Profile from './components/Studentside/Profile';
import StudentComplainList from './components/Studentside/StudentComplainList';
import Adminmain from './components/Adminside/Adminmain';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/student-home/add-complain" element={<Studentside/>}></Route>
      <Route path="/student-home/profile" element={<Profile/>}></Route>
      <Route path="/student-home/complain-list" element={<StudentComplainList/>}></Route>
      <Route path="/admin-home/profile" element={<Adminmain/>}></Route>
    </Routes>
  </Router>
  );
}

export default App;
