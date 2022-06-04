import React, { useEffect } from 'react';

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem("token");
  }, []); 

  const logout = () => {
    window.location = "/"
  }
  return(
    <div style={{textAlign:'center'}}>
      <h4> You have been logged out successfully</h4> 
      <button onClick={() => logout()}>Home</button>

    </div>
  );

}

export default Logout;