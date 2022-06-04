import React from 'react';

const AlertSuccess = () => {

  return(
    <div style={{textAlign:'center'}}>
      <h4>Alert has been created/updated successfully</h4>
      <h4>To go to alerts page, <a href="/alerts ">click here</a></h4>
      <h4>To go to create alerts page, <a href="/createAlert ">click here</a></h4>
    </div>
  );
}

export default AlertSuccess;