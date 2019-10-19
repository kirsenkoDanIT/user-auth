import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.loginLink} to="/">
              Users
            </NavLink>
          </Typography>
          <Button color="inherit">
            <NavLink className={classes.loginLink} to="/login">
              Login
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
