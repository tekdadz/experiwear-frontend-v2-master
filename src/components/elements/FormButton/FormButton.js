import { Button, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(3),
    height: 50,
  },
}))(Button);
