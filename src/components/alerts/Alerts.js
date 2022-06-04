import React, { useEffect } from "react";
import AlertContainer from "./AlertContainer";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

const Alerts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
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
    fetch("http://127.0.0.1:8080/alerts/getAll", options)
      .then((response) => {
        const temp = response.json()
        if (!response.ok) {
          return Promise.reject(error);
        }
        return temp;
      })
      .then((response) => {
        // setData(response);
        dispatch({type: "SAVE_ALERTS", payload: response})
        
      })
    .catch(error => {
       setError(true);
    });
  };

  return error ? (
    <h4 style={{ color: "red" }}>There has been some error, try reloading</h4>
  ) : (
    <div>
      {alerts.map((item, index) => {
        return <AlertContainer key={index} props={item} />;
      })}
    </div>
  );
};

export default Alerts;
