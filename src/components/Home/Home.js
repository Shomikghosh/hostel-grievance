import React,{useEffect} from 'react';
import Header from '../common/header'
import Footer from '../common/footer'
import Golden from '../../assets/hostel.jpg'
import './styles.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';


function Home() {
  let history = useNavigate()
  new Typewriter('#typewriter', {
    strings: ['Hello', 'World'],
    autoStart: true,
  });
  useEffect(() => {
    if(localStorage.getItem('person')==='student')
    history('/student-home/profile'); 
    if(localStorage.getItem('person')==='admin')
    history('/admin-home/profile'); 
    }, [])
  
  return (
    <>
        <Header/>
          <img className="home__page" src={Golden} alt="home-page" usemap="#workmap"/>
          <div className="centered">
             <Typewriter
            
            onInit={(typewriter) => {
              typewriter.typeString('Click on <strong style="font-style:italic">HOSTEL</strong> to Login')
                .callFunction(() => {
                  console.log('String typed out!');
                })
                .pauseFor(2500)
                .deleteAll()
                .callFunction(() => {
                  console.log('All strings were deleted');
                })
                .start();
            }}
          />
          </div>
         
          {/* <div >SJCE-Hostel Grievence<br/> */}
          {/* <Button
            variant="contained"
            href="/login"
            color='success'
            size="medium"
            sx={{ width: "50%", margin: "0 20%" }}
          >
            Register/Login
          </Button> */}
          {/* </div> */}
            <map name="workmap">
              <area shape="rect" coords="460,155,1130,457" alt="Hostel" href="/login"></area>
            </map>


        <Footer/> 
    </>
  )
}


export default Home;