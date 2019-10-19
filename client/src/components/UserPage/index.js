import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth
});

export const UserPage = connect(mapStateToProps)(props => {
  const { isAuth } = props;
  const state = props.history.location.state;

  return (
    <React.Fragment>
      <CssBaseline />
      {isAuth ? (
        <Container>
          <Typography component="h1" variant="h4" style={{ margin: '25px 0' }}>
            {state.login}
          </Typography>
          <Typography component="h2" variant="h5" style={{ marginBottom: 15 }}>
            {state.email}
          </Typography>
          <Typography component="h2" variant="h4" style={{ marginBottom: 10 }}>
            Description
          </Typography>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nemo
            repellat doloremque quia vel placeat nisi, facere praesentium?
            Aperiam natus dolores totam qui magnam saepe nesciunt animi beatae
            nihil repellendus. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Omnis nemo repellat doloremque quia vel placeat
            nisi, facere praesentium? Aperiam natus dolores totam qui magnam
            saepe nesciunt animi beatae nihil repellendus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Omnis nemo repellat doloremque
            quia vel placeat nisi, facere praesentium? Aperiam natus dolores
            totam qui magnam saepe nesciunt animi beatae nihil repellendus.
          </Typography>
        </Container>
      ) : (
        <Container>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ marginTop: 30 }}
          >
            You must be logged in to view this content
          </Typography>
        </Container>
      )}
    </React.Fragment>
  );
});
