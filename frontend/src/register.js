import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { config } from "./config/config";
import styles from "./login.module.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const handleInput= (e) =>{
   const [key,value]=[e.target.name,e.target.value];
  //  console.log(key,value);
   setFormData((nextFormData)=>({...nextFormData,[key]:value}));
  }

const register = async (formData) => {
  
  try{
    let url= "http://localhost:8008/register";
    await axios.post(url,{
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    setFormData({
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
    });
   

    enqueueSnackbar("Registered successfully",{variant:"success"});
  }catch(e){
    if(e.response && e.response.status === 400){
      return enqueueSnackbar(e.response.data.message,{variant:"error"});

    }else{
      enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
      {variant:"error"});
    }
  }

};


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Box className={styles.content}>
        <Stack spacing={1} className={styles.form}>
        <h2 className={styles.title}>GloApproval</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInput}
          />
          <TextField
            id="email"
            label="email"
            variant="outlined"
            title="email"
            name="email"
            placeholder="Enter your Email"
            fullWidth
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter a password"
            fullWidth
            onChange={handleInput}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleInput}
          />
          
        
           <Button className={styles.button} variant="contained" onClick={()=>{ register(formData);}}>
            Register
           </Button>
           <p className="secondary-action">
             Already Registered?{" "}
             <Link to="/">
              Login
             </Link>
          </p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
