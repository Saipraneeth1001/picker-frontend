import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Picker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {

  const token = localStorage.getItem("token");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (token) {
       navigate("/alerts");
    }
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const userDetails = {
      username: email,
      password: password,
    };
    // validateUserDetails(email, password);
    if (error !== true) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      fetch(process.env.REACT_APP_BASE_URL+"/users/login", options)
        .then((response) => {
          const temp = response.json()
        if (!response.ok) {
          return Promise.reject(error);
        }
        return temp;
        })
        .then((response) => {
          localStorage.setItem("token", response.jwt);
          dispatch({ type: "SAVE_TOKEN", payload: response.jwt })
          setTimeout(() => {
          navigate("/alerts");
          }, 3000);
        }).catch(error => {
          setError(true);
          setLoading(false);
       });

     
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {error ? (
              <p style={{ color: "red" }}>Please Provide Valid Credentials</p>
            ) : (
              ""
            )}
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
