import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { UserInfo } from './UserInfo';

import { useStyles } from './styles';
import { connect } from 'react-redux';

import { logout, clearErrors } from '../../store/actions';

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  user: state.userReducer.user
});

export const ButtonAppBar = connect(
  mapStateToProps,
  { logout, clearErrors }
)(props => {
  const classes = useStyles();
  const { isAuth, logout, clearErrors, user } = props;

  const AuthButton = () => {
    return isAuth ? (
      <React.Fragment>
        <UserInfo user={user} />
        <Button
          color="inherit"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </React.Fragment>
    ) : (
      <Button color="inherit" onClick={() => clearErrors()}>
        <NavLink className={classes.loginLink} to="/login">
          Login
        </NavLink>
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.loginLink} to="/">
              Users
            </NavLink>
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </div>
  );
});
