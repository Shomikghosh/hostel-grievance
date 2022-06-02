import React,{useEffect} from 'react';
import Header from '../common/header'
import Footer from '../common/footer'
import Golden from '../../assets/goldenjublee.JPG'
import './styles.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
function Home() {
  let history = useNavigate()

    if(localStorage.getItem('person')==='student')
    history('/student-home/profile'); 
    if(localStorage.getItem('person')==='admin')
    history('/admin-home/profile'); 
  
  return (
    <>
        <Header/>
          <img className="home__page" src={Golden} alt="home-page" />
          <div className="centered">SJCE-Hostel Grievence<br/><Button
            variant="contained"
            href="/login"
            color='success'
            size="medium"
            sx={{ width: "50%", margin: "0 20%" }}
          >
            Register/Login
          </Button></div>

        <Footer/> 
    </>
  )
}


export default Home;