import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loader from "../loader/loader";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 

export const CreateAlert = () => {

const BoxStyle = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

let navigate = useNavigate();

const [item, setItem] = React.useState("");
const [limit, setLimit] = React.useState("");
const [url, setUrl] = React.useState("");
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(false);
const token = localStorage.getItem("token");
useEffect(() => {
  if (!token) {
      window.location = "/"
  }
}, []);

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item, limit, url);
    const data = {
      url: url, limit: limit, itemName: item
    }
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+token
      },
      body: JSON.stringify(data)  
    }
    fetch(process.env.REACT_APP_BASE_URL+'/alerts/create', options)
    .then(response =>  {
      if (!response.ok) {
         return Promise.reject(error);
      } else {
        setTimeout(() => {
          setLoading(false);
          navigate("/alert-success");
        }, 3000);
      }
    }).catch(error => {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 3000);
    })
    
}

  return (
        loading ? <Loader /> :
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={BoxStyle}
            >
              <Typography component="h1" variant="h5">
                Paste the URL of the product
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="item-name"
                  type="text"
                  id="item-name"
                  autoComplete=""
                  value = {item}
                  onChange={(e) => {setItem(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="limit"
                  type="number"
                  id="limit"
                  placeholder="Example 699.99"
                  value = {limit}
                  onChange={(e) => {setLimit(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="URL"
                  type="text"
                  id="url"
                  autoComplete=""
                  value = {url}
                  onChange={(e) => {setUrl(e.target.value)}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Go
                </Button>
              </Box>
              {error ? <p style={{color: 'red'}}>Not able to create the alert, please try again</p>:
              <p></p>}
            </Box>
          </Container>      
  );
}