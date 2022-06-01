import React,{useState} from 'react'
import Header from '../common/header';
import Footer from '../common/footer';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';


import Register from './Register';
import Logins from './Login';

function Login() {

    const [value, setValue] = useState('2');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
      <>
           <Header/>
            <Box sx={{  typography: 'body1',height:'90vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',maxWidth:'100%',width:'50%' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Register" value="1" sx={{width:'50%',maxWidth:'50%'}} />
                    <Tab label="Login" value="2" sx={{width:'50%',maxWidth:'50%'}} />
                </TabList>
            </Box>
                <TabPanel value="1">        
                    <Register/>
                </TabPanel>
                <TabPanel value="2">
                    <Logins/>
                </TabPanel>
            </TabContext>
            </Box>
            <Footer/>
      </>
     
  )
}

export default Login