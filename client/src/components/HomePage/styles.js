import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    flexGrow: 1
  },

  card: {
    minWidth: 275,
    border: '1px solid'
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  userLInk:{
    textDecoration:'none',
    color:'#000'
  }
}));
