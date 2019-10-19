import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { useStyles } from './styles';

import { connect } from 'react-redux';

import { fetchUsers, clearErrors } from '../../store/actions';

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  users: state.userReducer.users
});

export const HomePage = connect(
  mapStateToProps,
  { fetchUsers, clearErrors }
)(props => {
  const classes = useStyles();

  const { fetchUsers, clearErrors, isAuth, users } = props;
  useEffect(() => {
    fetchUsers();
    clearErrors();
  }, [fetchUsers, clearErrors]);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {users && isAuth ? (
            users.map((value, index) => (
              <Grid key={index} item>
                <CardContent className={classes.card}>
                  <Typography variant="h5" component="h2">
                    {value.login}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {value.email}
                  </Typography>
                </CardContent>
              </Grid>
            ))
          ) : (
            <Typography component="h1" variant="h5">
              You must be logged in to see other users
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
});
