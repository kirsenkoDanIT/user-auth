import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStyles } from './styles';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../store/actions';

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  message: state.userReducer.message
});

export const SignIn = connect(
  mapStateToProps,
  { login, clearErrors }
)(props => {
  const classes = useStyles();

  const { login, clearErrors, message, isAuth } = props;

  const [user, setUser] = useState({
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {message ? message : 'Sign in'}
          {/* Sign in */}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            login(user);
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink className={classes.redirectLink} to="/register">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});
