import React,{useEffect, useState} from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function StudentComplainList() {
    let history = useNavigate()
    const [complainlist, setComplainList] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('person')!=='student')
            history('/');
        fetch("https://hostel-complaint-backend.herokuapp.com/student/home/status_complain/" + localStorage.getItem("usn"), {
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
    const reComplain=(cid)=>{
      fetch("https://hostel-complaint-backend.herokuapp.com/student/home/re_complain/"+localStorage.getItem("usn").toUpperCase()+"/"+cid , {
          method: 'GET',
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
    const [open, setOpen] = useState(false);
  const [cid, setCid] = useState();

  const handleClickOpen = (cid) => {
    setOpen(true);
    setCid(cid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [feedback, setFeedback] = useState({
    feedback: ""
 });


  const handleChangesss = (prop) => (event) => {
    setFeedback({ ...feedback, [prop]: event.target.value });
  };  
  const handleFormSubmit=()=>{
      fetch("https://hostel-complaint-backend.herokuapp.com/student/home/feedback_complain/"+localStorage.getItem("usn").toUpperCase()+"/"+cid+"?feedback="+feedback.feedback , {
        method: 'POST',
        headers: {
          'accept': 'application/json',
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
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Provide your feedback"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('feedback')} label="Feedback" value={feedback.feedback} style={{ margin: "1rem 0" }} fullWidth/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button
                autoFocus
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
                    {item.status===0?<Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black' }}>Registered</Button>:null}
                    {item.status===1?<Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black' }}>On Process</Button>:null}
                    {item.status===2?<Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black' }}>Fulfilled</Button>:null}
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black'}} onClick={(event)=>{handleClickOpen(item.cid)}}>Feedback</Button>
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'black'}} onClick={(event)=>{reComplain(item.cid)}}>Re-complain</Button>
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

export default StudentComplainList