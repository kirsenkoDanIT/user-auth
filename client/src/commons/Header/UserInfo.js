import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export const UserInfo = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} color="inherit">
        User info
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography variant="h5" component="h2" className={classes.userInfo}>
          {props.user.login}
        </Typography>
        <Typography variant="body2" component="p" className={classes.userInfo}>
          {props.user.email}
        </Typography>
      </Popover>
    </div>
  );
};
