import { getAlertTitleUtilityClass } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';



const UpdateAlert = () => {

  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [url ,setUrl] = useState();

  let stringId = window.location.href;
  let length = stringId.length;
  stringId = stringId.substring(length - 24, length);

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
    fetch("http://localhost:8080/alerts/get/"+stringId, options)
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
    fetch("http://localhost:8080/alerts/update/"+stringId, options)
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
    body: JSON.stringify(stringId)
    }
    fetch("http://localhost:8080/alerts/delete", options)
    .then(response => {
      const temp = response.json();
      if (!response.ok) {
        return Promise.reject(error);
      }
      return temp;
    }).then(response => {
      setTimeout(() => {
          navigate("/alerts");
      }, 3000)
    })
  }

  return (
    loading? <Loader /> :
    <div style = {{margin: 15}}>
        <TextField type = "text" 
        value = {url} 
        onChange = {(e) => {setUrl(e.target.value)}}
        label="url"
        style={{margin: 4}}
        />
        <TextField type = "text" 
        value = {price}
        onChange = {(e) => {setPrice(e.target.value)}}
        label = "limit"
        style={{margin: 4}}/>
        <TextField type = "text" value = {name} 
        onChange = {(e) => {setName(e.target.value)}}
        label = "name"
        style={{margin: 4}}/> 
        { error ? <p style={{color:'red'}}>There has been an error, please try again later</p>: <p></p> }
        <button style={{backgroundColor:'green', color: 'white', margin: 4}}
        onClick = {(e) => updateAlert(e)}>Update Alert</button>
        <button style={{backgroundColor:'red', color: 'white', margin: 4}}
        onClick = {() => deleteAlert}>Delete Alert</button>
    </div>
  );

}

export default UpdateAlert;