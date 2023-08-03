import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { TicketIcon } from 'components';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LINKS } from 'utils/constants';

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
  action: {
    width: 120,
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
  },
}));

const TicketItem = ({ data, className, ...boxProps }) => {
  const classes = useStyles();
  const router = useRouter();
  const fanbands = useSelector((state) => state.main.fanbands.results);
  const fanbandName = useMemo(
    () => fanbands.find((f) => f.id === data.userId)?.phone,
    [fanbands, data]
  );

  const handleClick = () => {
    router.push(LINKS.ticketModify.path.replace(':id', data.id));
  };

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box className={classes.icon}>
        <TicketIcon width="18px" />
      </Box>
      <Typography className={classes.content}>
        Barcode: <span>{data.barcode}</span> <br />
        Section: <span>{data.section}</span> ∙ Row: <span>{data.row}</span> ∙
        Seat: <span>{data.seat}</span> <br />
        Order: <span>{data.order}</span> <br />
        Fanband: <span>{fanbandName}</span> <br />
      </Typography>
      <Button
        fullWidth={false}
        className={classes.action}
        onClick={handleClick}
      >
        Modify
      </Button>
    </Box>
  );
};

export default TicketItem;
