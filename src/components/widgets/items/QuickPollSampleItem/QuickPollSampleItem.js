import { Box, makeStyles, Typography } from '@material-ui/core';
import { UserIcon } from 'components';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    justifyContent: 'space-between',
  },
  icon: {
    width: 64,
    height: 55,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6f5',
    marginRight: 16,
    color: theme.palette.info.main,
  },
  content: {
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    fontSize: 14,
    color: '#000',
    '&>span': {
      fontFamily: theme.custom.fonts.SFProTextRegular,
    },
    flexGrow: 1,
  },
  response: {
    minWidth: 120,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#f7fafc',
  },
}));

const QuickPollSampleItem = ({ data, className, ...boxProps }) => {
  const classes = useStyles();

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box display="flex" alignItems="center">
        <Box className={classes.icon}>
          <UserIcon />
        </Box>
        <Typography className={classes.content}>
          <span>Phone:&nbsp;</span>
          {data.phone}
        </Typography>
      </Box>
      <Box
        className={classes.response}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {data.response}
      </Box>
    </Box>
  );
};

export default QuickPollSampleItem;
