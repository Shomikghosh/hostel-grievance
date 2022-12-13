import React,{useEffect,useState} from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField } from '@mui/material';


function StudentsideForm() {
    let history = useNavigate()
    const [feedback, setFeedback] = useState({
        topic: "",
        description: "",
     });
    
    useEffect(() => {
        if(localStorage.getItem('person')!=='student')
            history('/');
    }, [])  
    const handleChangesss = (prop) => (event) => {
        setFeedback({ ...feedback, [prop]: event.target.value });
      };  
      const postComplain=()=>{
        const data = JSON.stringify(feedback);
    
        fetch("https://web-production-945f.up.railway.app/student/home/register_complain/"+localStorage.getItem("usn").toUpperCase() , {
          method: 'POST',
          body:data,
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
            <Box sx={{ display: 'grid',margin:'1.3rem 0.7rem',alignItems: 'center',justifyContent: 'center',backgroundColor: 'royalblue',color: 'white',fontSize: '1.3rem',padding:'0.5rem',borderRadius: '5px'}}>Complaint-Form</Box>
                <Box sx={{minHeight:'100vh',display:'flex',margin:'2vh 2rem',flexDirection:'column'}}>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('topic')} label="Topic" value={feedback.topic} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('description')} label="Description" value={feedback.description} style={{ marginBottom: "1rem" }} multiline  rows={6} fullWidth/>
                    <Button variant="contained" size="medium" sx={{  margin: "1vh auto",backgroundColor:'royalblue'}} onClick={postComplain}>Post</Button>
                </Box>
            <Footer/>
        </>
    )
}

export default StudentsideForm