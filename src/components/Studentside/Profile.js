import React,{useEffect,useState} from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Profile() {
    let history = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('person')!=='student')
            history('/');
    }, [])    
    const [studentdetails, setStudentDetails] = useState("");
    useEffect(() => {
        fetch("https://web-production-945f.up.railway.app/student/home/view_user/" + localStorage.getItem("usn"), {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            setStudentDetails(data);
        });
    }, [studentdetails.length]);
    const [pass, setNewPass] = useState({
        oldpass: "",
        newpass: "",
        confmnew: "",
      });
    
    const handleChangePassClick = (e) => {
        if (pass.newpass === "" || pass.confmnew === "" || pass.oldpass === "") {
          toast.error("Field Required", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          if (pass.newpass === pass.confmnew) {
            fetch(
                "https://web-production-945f.up.railway.app/auth/home/password/changepassword/" +
                localStorage.getItem("usn") +
                "?oldpass=" +
                pass.oldpass +
                "&newpass=" +
                pass.newpass,
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                toast.info(data.detail, {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                toast.success(data.message, {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
          } else {
            toast.warning("New password must match with confirmed password!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      };
      const handleChangePass = (prop) => (event) => {
        setNewPass({ ...pass, [prop]: event.target.value });
      };
      const updateStudentDetails=()=>
      {
        studentdetails.sem=parseInt(studentdetails.sem)
        const data = JSON.stringify(studentdetails);
    
        fetch("https://web-production-945f.up.railway.app/student/home/edit_user/"+localStorage.getItem('usn').toUpperCase(), {
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
      const handleChangesss = (prop) => (event) => {
        setStudentDetails({ ...studentdetails, [prop]: event.target.value });
      };
    return (
        <>
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Header/>
                <Box sx={{minHeight:'100vh',margin:'5vh 2rem',display:'flex',alignItem:'center',justifyContent:'center',flexDirection:'column'}}>
                    <Box sx={{ display: 'flex',marginBottom:'1.3rem',alignItems: 'center',justifyContent: 'center',backgroundColor: 'royalblue',color: 'white',fontSize: '1.3rem',padding:'0.5rem',borderRadius: '5px'}}>Student Profile </Box>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('name')} label="Name" value={studentdetails.name} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('email')} label="Email" value={studentdetails.email} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('srn')} label="SRN" value={studentdetails.srn} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled"  InputLabelProps={{ shrink: true}} onChange={handleChangesss('block')} label="Block" value={studentdetails.block} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('room')} label="Room" value={studentdetails.room} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('branch')} label="Branch" value={studentdetails.branch} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('sem')} label="Sem" value={studentdetails.sem} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('phone')} label="Phone" value={studentdetails.phone} style={{ marginBottom: "1rem" }} fullWidth/>
                    <TextField id="outlined-disabled" InputLabelProps={{ shrink: true}} onChange={handleChangesss('secondary_phone')} label="Secondary Phone" value={studentdetails.secondary_phone} style={{ marginBottom: "1rem" }} fullWidth/>
                    <Button variant="contained" size="medium" sx={{  margin: "0 auto",backgroundColor:'royalblue' }} onClick={updateStudentDetails}>Update</Button>
                    <Box sx={{ display: 'flex',margin:'1.3rem 0',alignItems: 'center',justifyContent: 'center',backgroundColor: 'royalblue',color: 'white',fontSize: '1.3rem',padding:'0.5rem',borderRadius: '5px'}}>Change Password</Box>
                    <TextField fullWidth label="Current Password" id="fullWidth" placeholder="Current Password" type="password" value={pass.oldpass} onChange={handleChangePass("oldpass")} style={{ marginBottom: "1rem" }}/>
                    <TextField fullWidth label="New Password" id="fullWidth" placeholder="New Password" type="password" value={pass.newpass} onChange={handleChangePass("newpass")} style={{ marginBottom: "1rem" }} />
                    <TextField fullWidth label="Re-enter New Password" id="fullWidth" placeholder="Re-enter New Password" value={pass.confmnew} onChange={handleChangePass("confmnew")} type="password" style={{ marginBottom: "1rem" }} />
                    <Button variant="contained" style={{ margin: "0 auto",backgroundColor:'royalblue' }} onClick={(event) => handleChangePassClick(event)}>UPDATE</Button>
                </Box>
            <Footer/>
        </>
    )
}

export default Profile