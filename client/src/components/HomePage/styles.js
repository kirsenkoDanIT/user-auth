import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width:"100%",
    margin:"0 auto"
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
