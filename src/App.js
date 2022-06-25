import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CreateAlert } from './components/alerts/CreateAlert';
import Navbar from './components/navbars/Navbar';
import SignIn from './components/user/SignIn';
import Register from "./components/user/Register";
import React from 'react';
import Alerts from './components/alerts/Alerts';
import LoggedInNavbar from './components/navbars/LoggedInNavbar';
import Products from './components/Products';
import Profile from './components/user/Profile';
import AlertSuccess from './components/redirects/AlertSuccess';
import UpdateAlert from './components/alerts/UpdateAlert';
import Logout from './components/user/Logout';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import OtpVerification from './components/user/OtpVerification';
import MaterialPractice from './components/MaterialPractice';

function App() {
  return (
    
      <Routes>
        <Route path = "/"  element = {[<Navbar key = {0}/>, <SignIn key = {1} />]}/> 
        <Route path = "/alerts" element = {[<LoggedInNavbar key = {0} />, <Alerts key = {1}/>]} />
        <Route path = "/createAlert" element = {[<LoggedInNavbar key = {0}/>, <CreateAlert key = {1} />]} />
        <Route path = "/login" element = {[<Navbar key={0} />, <SignIn key = {1} />]} />
        <Route path = "/products" element = {<Products />} />
        <Route path = "/profile" element = {<Profile  />} />
        <Route path = "/register" element = {[<Register key={1} />]} /> 
        <Route path = "/alert-success" element = {<AlertSuccess />} />
        <Route path = "/update/:id" element = {[<LoggedInNavbar key = {0} />, <UpdateAlert key = {1} />]}/>
        <Route path = "/forgotPassword" element = {<ForgotPassword />} />
        <Route path = "/new-password" element = {<NewPassword />} />
        <Route path = "/logout" element = {<Logout />} />
        <Route path = "/otp-verification" element = {<OtpVerification />} />
        <Route path = "/material-practice" element = {<MaterialPractice />} />
      </Routes>
      
   
  );
}

export default App;
