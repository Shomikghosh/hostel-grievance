import React from 'react';
import Header from '../common/header'
import Footer from '../common/footer'
import Golden from '../../assets/goldenjublee.JPG'
import './styles.css'
import Button from '@mui/material/Button';
function Home() {

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