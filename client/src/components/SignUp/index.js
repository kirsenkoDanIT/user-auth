import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';

import { connect } from 'react-redux';
import { createUser, clearErrors } from '../../store/actions';

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  message: state.userReducer.message
});

export const SignUp = connect(
  mapStateToProps,
  { createUser, clearErrors }
)(props => {
  const classes = useStyles();

  const { createUser, isAuth, message, clearErrors } = props;

  const [user, setUser] = useState({
    login: '',
    password: '',
    email: ''
  });
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);
  const onChangeHandler = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      {isAuth ? <Redirect to="/" /> : null}
      {message ? console.log(message) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {message ? message : 'Sign up'}
          {/* Sign up */}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            createUser(user);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="login"
                variant="outlined"
                required
                fullWidth
                label="Login"
                autoFocus
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink className={classes.redirectLink} to="/login">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
});
