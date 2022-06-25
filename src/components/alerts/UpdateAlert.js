import { getAlertTitleUtilityClass } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



const UpdateAlert = () => {

  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [url ,setUrl] = useState();

  let alertId = window.location.href;
  let length = alertId.length;
  alertId = alertId.substring(length - 24, length);

  useEffect(() => {
    if (!token) {
      window.location = "/"
    }
    getAlert();
    
  }, [])

  const getAlert = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      }
    }
    fetch(process.env.REACT_APP_BASE_URL+"/alerts/get/"+alertId, options)
    .then(response => { 
      const temp = response.json();
      if (!response.ok) {
        return Promise.reject(error);
      }
      return temp;
    })
    .then(response => {
        setData(response);
        setName(response.item.itemName);
        setPrice(response.limit);
        setUrl(response.item.itemUrl);
    })
    .catch(error => {
        setError(true);
    }) 
  }

  const updateAlert = (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
      method : "PUT",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer "+token
      },
      body: JSON.stringify({
        itemName: name,
        itemUrl: url,
        limit: price
      })
    }
    fetch(process.env.REACT_APP_BASE_URL+"/alerts/update/"+alertId, options)
    .then(response => {
      const temp = response.json();
      if (!response.ok) {
        return Promise.reject(error);
      }
      return temp;
    }).then(response => {
      setTimeout(() => {
        window.location  = "/alert-success"
      },3000);
    })
    .catch(error => {
      setError(true);
    })
  }

  const deleteAlert = () => {
    setLoading(true);
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization": "Bearer "+token
      },
      body: alertId
    
    }
    fetch(process.env.REACT_APP_BASE_URL+"/alerts/delete/", options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(error);
      }
      return response;
    }).then(response => {
      setTimeout(() => {
          navigate("/alerts");
      }, 3000)
    }).catch(err => {
      setLoading(false);
      setError(true);
    })
  }

  return (
    loading? <Loader /> :
    <Box style = {{margin: 15}} flex>
        <Grid style={{margin: 4}}>
          <Typography variant = "subtitle1">Url:</Typography>
          <TextField variant = "outlined" type = "text" 
            value = {url} 
            onChange = {(e) => {setUrl(e.target.value)}}
            />
        </Grid>
        <Grid style={{margin: 4}}>
          <Typography variant = "subtitle1">Limit: </Typography>
          <TextField variant = "outlined" type = "text" 
            value = {price}
            onChange = {(e) => {setPrice(e.target.value)}}
            />
        </Grid>
       <Grid style={{margin: 4}}> 
         <Typography variant = "subtitle1">ItemName: </Typography>
         <TextField variant = "outlined" type = "text" value = {name} 
          onChange = {(e) => {setName(e.target.value)}}
          /> 
       </Grid> 
        { error ? <p style={{color:'red'}}>There has been an error, please try again later</p>: <p></p> }
        <Button style={{backgroundColor:'green', color: 'white', margin: 4}}
        onClick = {(e) => updateAlert(e)}>Update Alert</Button>
        <Button style={{backgroundColor:'red', color: 'white', margin: 4}}
        onClick = {(e) => deleteAlert(e)}>Delete Alert</Button>
    </Box>
  );

}

export default UpdateAlert;