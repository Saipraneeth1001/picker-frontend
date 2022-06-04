import { Box } from '@mui/material';
import { textAlign } from '@mui/system';
import React, { useEffect, useState } from 'react';






const Profile = () => {

  // const token = localStorage.getItem("token");
  const [error, setError] = useState(false);
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   if (!token) {
  //     setError(true);
  //   } else {
  //     getUserDetails();
  //   }
  // }, [])

  // const getUserDetails = () => {
  //   const options = {
  //     method: "GET",
  //     headers : {
  //       "Content-Type":"application/json",
  //       "Accept":"application/json",
  //       "Authorization": "Bearer " + token
  //     }
  //   }
  //   fetch("http://localhost:8080/getUserDetails")
  //   .then(response => {
  //     const temp = response.json();
  //     if (!response.ok) {
  //       return Promise.reject(error);
  //     }
  //   }).then(response => {

  //   })
  // }



  return(
    <Box sx={{ textAlign: 'center'}}>
      {error ? <p style={{color: 'red'}}> Not able to obtain the user's data, please try again later.</p> 
      :<p></p>}
      <div style={{margin: 15}}> 
        <h4>Sorry For Inconvinience</h4>
        <h4>Still Under Development</h4>
        <button style={{backgroundColor:'blue', color:'white'}}
        onClick = {(e) => window.location="/alerts"}>My Alerts</button>
      </div>
    </Box>
    
  );
}


export default Profile;
