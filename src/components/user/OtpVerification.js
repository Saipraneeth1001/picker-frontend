import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OtpVerification = () => {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgot = (e) => {
     e.preventDefault();
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
      body: JSON.stringify({username: name, otp: otp})
      }
      fetch(process.env.REACT_APP_BASE_URL+"/forgotPassword/checkOTP", options)
      .then(response => {
        setTimeout(() => {
            dispatch({ type: "SAVE_USER_FORGOT_PASSWORD", payload: name})
            navigate("/new-password")
        }, 3000)

      }).catch(error => {
        setError(true);
        setLoading(false)
      })
  }

  return(
    loading ?<Loader /> : 
    <div style={{  magin: 15 }}>

      <p style={{ margin: 5 , fontStyle: 'bold'}}>Please enter your username and otp</p>

        <TextField 
        label = "username"
        onChange={(e) => {setName(e.target.value); setError(false)}}
        value = {name}
        style={{maring: 5}}
        />

    <TextField 
        label = "otp"
        style = {{margin: 5}}
        onChange={(e) => { setOtp(e.target.value); setError(false)}}
        value = {otp}
        />

        <button style = {{ backgroundColor: 'green', color:'white', margin: 5}}
          onClick = {(e) => forgot(e)}> Submit
        </button>
        <button style = {{ backgroundColor: 'green', color:'white', margin: 5}}
          onClick = {() => {window.location = "/"}}> Home
        </button>
        { error ? <p style={{color:'red'}}>Invalid OTP, please try again</p>
      :<p></p> }

    </div>
  );
}

export default OtpVerification;