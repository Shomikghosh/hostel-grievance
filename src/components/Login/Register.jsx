import React,{useState} from 'react'
import './styles.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loader from "../Loading/Loading";
import Box from '@mui/material/Box';

function Register() {
    const [loading, setLoader] = useState(false);

    const [valueRegister, setValuesRegister] = useState({
      usn: "",
      email: "",
    });
    const handleChange = (prop) => (event) => {
        setValuesRegister({ ...valueRegister, [prop]: event.target.value });
      };

      const handleRegister = (event) => {
        setLoader(true);
        const details = {
          usn: valueRegister.usn,
          email: valueRegister.email,
        };
        fetch(
          "https://hostel-complaint-backend.herokuapp.com/" +
            "auth/auth/register?usn=" +
            details.usn +
            "&email=" +
            details.email,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.status === 422) {
              response.json();
              setLoader(false);
            } else if (response.status === 200) {
              response
                .json()
                .then((data) => {
                  setLoader(false);
                })
                .then(() => {});
            } else {
              setLoader(false);
            }
          })
          .catch((error) => console.error("Error:", error));
      };

  return (
    <>
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "120%", maxWidth: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
    <div className="loginstudent__whole">
          <TextField
            id="standard-basic"
            label="USN"
            variant="standard"
            // values={valueRegister.usn}
            onChange={handleChange("usn")}
            sx={{ paddingBottom: "0", maxWidth: "100%" }}
            inputProps={{ maxLength: 12 }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            // values={valueRegister.email}
            onChange={handleChange("email")}
            sx={{ paddingBottom: "0", marginBottom: "0", maxWidth: "100%" }}
          />{" "}
          {loading ? <Loader /> : null}
          <Button
            variant="contained"
            onClick={(event) =>
             handleRegister(event)
             }
            disabled={loading ? true : false}
            size="medium"
            sx={{ width: "50%", margin: "0 auto" }}
          >
            Register
          </Button>
        </div>
    </Box>
    </>
  )
}

export default Register