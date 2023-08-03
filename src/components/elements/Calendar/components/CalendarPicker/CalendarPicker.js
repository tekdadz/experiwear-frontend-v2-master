import { Box, IconButton, makeStyles } from '@material-ui/core';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons';
import moment from 'moment';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
  },
  picker: ({ minimized }) => ({
    display: 'flex',
    alignItems: 'center',
    width: minimized ? '100%' : 'unset',
  }),
  arrowLeftButton: ({ minimized }) => ({
    margin: minimized ? '-12px -12px -12px auto' : -12,
    order: minimized ? 1 : 0,
    fontSize: minimized ? '1rem' : '1.5rem',
  }),
  arrowRightButton: ({ minimized }) => ({
    margin: minimized ? '-12px 8px -12px 12px' : -12,
    order: 2,
    fontSize: minimized ? '1rem' : '1.5rem',
  }),
  label: ({ minimized }) => ({
    order: minimized ? 0 : 1,
    fontFamily:
      theme.custom.fonts[
        minimized ? 'SFProTextRegular' : 'SFProDisplayBlackItalic'
      ],
    fontSize: minimized ? 12 : 16,
    fontWeight: minimized ? 'normal' : 900,
    color: minimized ? '#333' : theme.palette.info.main,
    letterSpacing: minimized ? 'normal' : 0.48,
    padding: theme.spacing(0, 0.5),
    minWidth: 147,
    textAlign: minimized ? 'left' : 'center',
  }),
}));

const CalendarPicker = ({ year, month, onChange, actions, minimized }) => {
  const classes = useStyles({ minimized });

  // eslint-disable-next-line
  useEffect(() => onChange(year, month), []);

  const handleArrowBackClick = () => {
    if (month === 1) {
      onChange(year - 1, 12);
    } else {
      onChange(year, month - 1);
    }
  };

  const handleArrowForwardClick = () => {
    if (month === 12) {
      onChange(year + 1, 1);
    } else {
      onChange(year, month + 1);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.picker}>
        <IconButton
          className={classes.arrowLeftButton}
          onClick={handleArrowBackClick}
        >
          <ArrowBackIosOutlined fontSize="inherit" />
        </IconButton>
        <Box className={classes.label}>
          {`${moment.months(month - 1)} ${year}`}
        </Box>
        <IconButton
          className={classes.arrowRightButton}
          onClick={handleArrowForwardClick}
        >
          <ArrowForwardIosOutlined fontSize="inherit" />
        </IconButton>
      </Box>
      {actions && <Box className={classes.actions}>{actions}</Box>}
    </Box>
  );
};

export default CalendarPicker;
