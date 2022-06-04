
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const NewPassword = () => {


  let navigate = useNavigate();
  const user = useSelector((state) => state.user_forgot_password);

  useEffect(() => {
    if (!user) {
      navigate("/forgotPassword");
    }
  }, [])

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({name, password})
      }
      fetch("http://localhost:8080/forgotPassword/new", options)
      .then(response => {
         window.location = "/"
      }).catch(error => {
        setError(true);
        
      });

      
  }

  return(
    <div style={{  magin: 5 }}>
        <TextField 
        style={{margin: 5}}
        label = "username"
        onChange={(e) => setName(e.target.value)}
        value = {name}
        />
        <TextField 
        style={{margin: 5}}
        label = "password"
        onChange={(e) => setPassword(e.target.value)}
        value = {password}
        />
        <button style = {{ backgroundColor: 'green', color:'white'}}
          onClick = {() => submit()}> submit
        </button>
      { error ? <p style={{color:'red'}}> Can't change the password, please try again after sometime</p>
      :<p></p> }
    </div>
  );
}

export default NewPassword;