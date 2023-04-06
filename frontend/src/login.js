import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import axios from "axios";
import { config } from "./config/config";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading]= useState(false);
  const [formData, setFormData] = useState({
    username:"",
    password:"",
  });

  const handleInput= (e) =>{
   const [key,value]=[e.target.name,e.target.value];
   setFormData((nextFormData)=>({...nextFormData,[key]:value})); 
  }
  

  const login = async (formData) => {
    if (!validateInput(formData)) return;

    setLoading(true);
    try{
      const response = await axios.post(`${config.endpoint}/auth/login`,formData
      );

      persistLogin(
        response.data.token,
        response.data.username,
        response.data.balance,
      );

      setFormData({
        username:"",
        password:"",
      });
      setLoading(false);

      enqueueSnackbar("Logged in successfully",{variant:"success"});
     
    }catch(e){
      setLoading(false);
      if(e.response && e.response.status === 400){
        return enqueueSnackbar(e.response.data.message,{variant:"error"});

      }else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
        {variant:"error"});
      }
    }

  };

  const validateInput = (data) => {
    if(!data.username){
      enqueueSnackbar("Username is a required field",{variant:"warning"});
      return false;
    }

    if(!data.password){
      enqueueSnackbar("Password is a required field",{variant:"warning"});
      return false;
    }
    return true;
   
  };

  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token",token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance",balance);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Box className={styles.content}>
        <Stack spacing={2} className={styles.form}>
        <h2 className={styles.title}>GloApproval</h2>
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            title="Email"
            name="Email"
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
          
           {loading?(<Box display="flex" justifyContent="center" alignItems="center">
             <CircularProgress color="primary" value={25}/>
           </Box>
           ):(
           <Button className={styles.button} variant="contained" onClick={async()=>{
            await login(formData);}}>
            LOGIN
           </Button>
           )}
           <p className="secondary-action">
             Don't have an account?{" "}
             <Link to="/register">
              Register Now
             </Link>
          </p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
