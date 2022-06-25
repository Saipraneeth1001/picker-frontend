import React, { useEffect } from "react";
import AlertContainer from "./AlertContainer";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Alerts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const alerts = useSelector((state) => state.alerts);
  const token = localStorage.getItem("token");

  let dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
        window.location = "/"
    }
    
    getAllalerts();
  }, []);

  const getAllalerts = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer " + token,
      },
    };
    fetch(process.env.REACT_APP_BASE_URL + "/alerts/getAll", options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.empty) {
        setEmpty(true);
      } 
      if (response.error) {
        setError(true);
      }
      dispatch({type:"SAVE_ALERTS", payload: response.alerts});
    })
  };

  return error ? (
    <h4 style={{ color: "red" }}>There has been some error, try reloading</h4>
  ) :  
  <>
  {empty ? 

      <div style={{margin: 15}}>
      <p>Please Create an alert by navigating to create alerts tab</p>
      </div>
      :
      <div>
      {alerts.map((item, index) => {
        return <AlertContainer key={index} props={item} />
      })}
    </div>
   }
    
  </>
  
};

export default Alerts;
