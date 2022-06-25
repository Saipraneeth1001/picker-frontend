import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const forgot = (e) => {
    e.preventDefault();
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
      body: JSON.stringify({username: name})
      }
      fetch(process.env.REACT_APP_BASE_URL+"/forgotPassword/retrieve", options)
      .then(response => {
        setTimeout(() => {
            navigate("/otp-verification")
        }, 3000)

      }).catch(error => {
        setError(true);
        setLoading(false)
      })
  }

  const goHome = () => {
      window.location = "/"
  }

  return(
    loading ? <Loader /> : 
    <div style={{  magin: 15}}>
        <TextField 
        style={{margin: 5}}
        label = "username"
        onChange={(e) => {setName(e.target.value); setError(false);}}
        value = {name}
        />
        <button style = {{ backgroundColor: 'green', color:'white', margin: 5}}
          label = "otp"
          onClick = {(e) => forgot(e)}> Get OTP
        </button>
        <button style = {{ backgroundColor: 'green', color:'white', margin: 5}}
          onClick = {() => goHome()}>
            Home
        </button>
        { error ? <p style={{color:'red'}}> Can't change the password, please try again after sometime</p>
      :<p></p> }

    </div>
  );
}

export default ForgotPassword;