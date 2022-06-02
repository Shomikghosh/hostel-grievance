import React,{useEffect, useState} from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function Adminmain() {
    let history = useNavigate()
    const [complainlist, setComplainList] = useState([]);
    useEffect(() => {
      if(localStorage.getItem('person')!=='admin')
          history('/');
  }, [])    
    useEffect(() => {
        fetch("https://hostel-complaint-backend.herokuapp.com/admin/home/status_complaint/", {
          method: "GET",
          headers: {
              accept: "application/json",
          },
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(complainlist)
  
              setComplainList(data);
          });
    }, []) 
   
    const handleblock=(cid)=>{
      fetch("https://hostel-complaint-backend.herokuapp.com/admin/home/block/"+cid , {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => {
        toast.success(data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    }

    const startPro=(newsta,cid)=>{
      fetch("https://hostel-complaint-backend.herokuapp.com/admin/home/status/"+cid+"?status="+newsta , {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => {
        toast.success(data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    }

    const endPro=(newSta,cid)=>{
      fetch("https://hostel-complaint-backend.herokuapp.com/admin/home/status/"+cid+"?status="+newSta , {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
      .then(data => {
        toast.success(data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
    }
  return (
    <>
        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Header/>
        <Box sx={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
          <Box sx={{ display: 'grid',margin:'1.3rem 0.7rem',alignItems: 'center',justifyContent: 'center',backgroundColor: 'black',color: 'white',fontSize: '1.3rem',padding:'0.5rem',borderRadius: '5px'}}>Complains</Box>
            <Box sx={{gridTemplateColumns: 'repeat(3, 1fr)',gridTemplateRows: '1fr',display:'grid'}}>
              {complainlist?.map((item,i)=>{return(
                <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',margin:'1rem 3rem',padding:'1rem',borderRadius:'1rem',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                    <div><strong>Cid:</strong>{item.cid}</div>
                    <div><strong>Description:</strong>{item.description}</div>
                    <div><strong>USN:</strong>{item.usn}</div>
                    <div><strong>Date:</strong>{item.date}</div>
                    <div><strong>Topic:</strong>{item.topic}</div>
                    <div><strong>Feedback:</strong>{item.feedback?item.feedback:"No feedback"}</div>
                    <Box sx={{display:'flex'}}>
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black' }} onClick={(event)=>{startPro(1,item.cid)}}>Start</Button>
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black' }} onClick={(event)=>{endPro(2,item.cid)}}>Finish</Button>
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black'}} onClick={(event)=>{handleblock(item.cid)}}>Block</Button>
                    </Box>
                </div>
              )
              })}
            </Box>
          </Box>
        <Footer/>
    </>
  )
}

export default Adminmain