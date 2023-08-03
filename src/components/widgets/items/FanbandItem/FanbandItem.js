import { Box, makeStyles, Typography } from '@material-ui/core';
import { FanbandIcon } from 'components';
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
    width: 80,
    height: 80,
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
}));

const FanbandItem = ({ data, className, ...boxProps }) => {
  const classes = useStyles();

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box className={classes.icon}>
        <FanbandIcon width="48px" />
      </Box>
      <Typography className={classes.content}>
        {data.name && (
          <>
            <span>{data.name}</span> <br />
          </>
        )}
        <span>MAC address: {data.mac}</span> <br />
        <span>PIN code: {data.pin}</span> <br />
        <span>Mobile phone: {data.phone}</span> <br />
      </Typography>
    </Box>
  );
};

export default FanbandItem;
