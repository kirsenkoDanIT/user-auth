import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { useStyles } from './styles';

import { connect } from 'react-redux';

import { fetchUsers, clearErrors } from '../../store/actions';

const mapStateToProps = state => ({
  users: state.userReducer.users
});

export const HomePage = connect(
  mapStateToProps,
  { fetchUsers, clearErrors }
)(props => {
  const classes = useStyles();

  const { fetchUsers, clearErrors, users } = props;
  useEffect(() => {
    fetchUsers();
    clearErrors();
  }, [fetchUsers, clearErrors]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {users
            ? users.map((value, index) => (
                <Grid item key={index}>
                  <NavLink
                    to={{
                      pathname: `/user/${value._id}`,
                      state: value
                    }}
                    className={classes.userLInk}
                  >
                    <CardContent className={classes.card}>
                      <Typography variant="h5" component="h2">
                        {value.login}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {value.email}
                      </Typography>
                    </CardContent>
                  </NavLink>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
});
