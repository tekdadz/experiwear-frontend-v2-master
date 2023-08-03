import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: (props) => props.size,
    fontWeight: 900,
    letterSpacing: 0.48,
    color: (props) => props.color || theme.palette.info.main,
    textTransform: 'uppercase',
  },
}));

const Title = ({ children, className, size = 16, color, ...boxProps }) => {
  const classes = useStyles({ size, color });

  return (
    <Box className={clsx(classes.root, className)} {...boxProps}>
      {children}
    </Box>
  );
};

export default Title;
