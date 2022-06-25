import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem("token");
  }, []); 

  return(
    <div style={{textAlign:'center'}}>
      <h4> You have been logged out successfully</h4> 
      <Button href="/" variant = "contained" color = "primary">Home</Button>

    </div>
  );

}

export default Logout;