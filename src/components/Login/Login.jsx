import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loading/Loading'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTextFields() {
  const [loading,setLoader]=useState(false);

  const [valuesLogin, setValuesLogin] = useState({
    password: '',
    usn: '',
    email:''
  });
  let history = useNavigate()
  const [isForgot,setForgot]=useState(true);



  const handleChange = (prop) => (event) => {
    setValuesLogin({ ...valuesLogin, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValuesLogin({
      ...valuesLogin,
      showPassword: !valuesLogin.showPassword,
    });
  };
 


  const [ps,setps]=useState(false);
  const [admin,setadmin]=useState(false);

  const handleLogin =(event)=>{
    setLoader(true);
    const details = {
      "usn":valuesLogin.usn,
      "password":valuesLogin.password
    }
    if(valuesLogin.usn==="SJCEHOSTEL00")
    {
      fetch("https://hostel-complaint-backend.herokuapp.com/auth/auth/admin_login?usn="+valuesLogin.usn+"&password="+valuesLogin.password , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
        })
        .then(response=>{
          if(response.status === 400){
            response.json()
            setLoader(false);
            setps(true);
            toast.error("Wrong password of admin try again!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }else if(response.status === 200){
            response.json()
            .then(data => {
              console.log(data)
                localStorage.setItem('access-token', data.access)
                localStorage.setItem('person','admin')
                history("/admin-home/profile")
                setLoader(false);
                setps(false);
                setadmin(false);
              })
        }else{
          setLoader(false);
          toast.error("Server error", {
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
    ).catch((error) => console.error('Error:', error))
    }else{
      const data = JSON.stringify(details);
      fetch("https://hostel-complaint-backend.herokuapp.com/auth/login?usn="+details.usn+"&password="+details.password , {
        method: 'POST',
        body: data ,
         headers: {
          'Content-Type': 'application/json'
      },})
      .then(response=>{
        if(response.status === 400){
          response.json()
          setLoader(false);
          toast.error("Wrong username or password try again!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else if(response.status === 200){
          response.json()
          .then(data => {
            localStorage.setItem('access-token', data.access)
            localStorage.setItem('usn', details.usn)
            localStorage.setItem('person','student')
              setLoader(false);
            }).then(()=>{
            
              history("/student-home/profile")
  
            })
      }
      else if(response.status===500){
        setLoader(false);
        toast.error("Server error", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }}
      )
      .catch((error) => console.error('Error:', error))
    }
  }

  const handleForgot =(event)=>{
    setLoader(true);
    const details = {
      "usn":valuesLogin.usn,
      "email":valuesLogin.email
    }
    fetch("https://hostel-complaint-backend.herokuapp.com/auth/auth/forgot_password?usn="+details.usn+"&email="+details.email , {
        method: 'POST',
         headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response=>{
      if(response.status === 422){
        response.json()
        setLoader(false);
        toast.success("Invalid mail or usn", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else if(response.status === 200){
        response.json()
        
        .then(data => {
            localStorage.setItem('access-token', data.access)
            setLoader(false);
            toast.success("Mail has been sent", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }).then(()=>{
          })
    }
    else{
      setLoader(false);

    }}
    )
    .catch((error) => console.error('Error:', error))
  }
  

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };





  return (<>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <div className="loginstudent__whole">
            <TextField id="standard-basic" label="USN" variant="standard" values={valuesLogin.usn}               
            onChange={handleChange('usn')}
            inputProps={{ maxLength: 12 }}
            sx={{paddingBottom:'0'}}
              />
              {isForgot?(<FormControl sx={{ m: 1, width: '120%',maxWidth:'100%' ,marginLeft:'0'}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={valuesLogin.showPassword ? 'text' : 'password'}
              value={valuesLogin.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesLogin.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }
          />{loading?<Loader/>:null}

          </FormControl>):(<>
          <TextField id="standard-basic" label="Email" variant="standard" values={valuesLogin.email}               
            onChange={handleChange('email')}
            sx={{paddingBottom:'0', m: 1, width: '120%',maxWidth:'100%' ,marginLeft:'0'}}
              />{loading?<Loader/>:null}</>)
          }
            

            {isForgot?(
              <Button onClick={()=>{setForgot(!isForgot)}}>Forgot Password?</Button>
            ):(
              <Button onClick={()=>{setForgot(!isForgot)}}>Login Now</Button>
            )}
            {isForgot?(
              <Button variant="contained" onClick={event=> handleLogin(event)} disabled={(loading)?true:false} size="medium" sx={{width:'50%',margin:'0 auto'}}>
              Sign In
            </Button>
            ):
            (<Button variant="contained" onClick={event=> handleForgot(event)} disabled={(loading)?true:false} size="medium" sx={{width:'50%',margin:'0 auto'}}>
              Send Mail
            </Button>)}
            
 
        </div>
        
        
      
    </Box></>
  );
}