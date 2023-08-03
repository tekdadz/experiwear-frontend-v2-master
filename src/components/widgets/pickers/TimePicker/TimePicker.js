import { memo, useMemo } from 'react';
import {
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import clsx from 'clsx';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  digit: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 8,
  },
  ampm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 68,
  },
  ampmButton: {
    fontSize: 18,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    padding: 8,
    color: '#eaeef4',
  },
  ampmSelected: {
    color: '#000',
  },
  font: {
    fontSize: 28,
    color: '#000',
    fontFamily: theme.custom.fonts.SFProTextSemibold,
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: 28,
    color: '#000',
    width: 50,
    fontFamily: theme.custom.fonts.SFProTextSemibold,
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '-moz-appearance': 'textfield',
  },
}));

const TimePicker = ({ value, onChange, ...boxProps }) => {
  const classes = useStyles();
  const hour = useMemo(() => moment(value).format('hh'), [value]);
  const min = useMemo(() => moment(value).format('mm'), [value]);
  const am = useMemo(() => moment(value).format('a') === 'am', [value]);

  const handleHourChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 12) {
      onChange(moment(value).hours(e.target.value).toDate());
    }
  };

  const handleMinChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 59) {
      onChange(moment(value).minutes(e.target.value).toDate());
    }
  };

  const handleAmPmChange = (ampm) => {
    if (ampm === 'am') {
      onChange(moment(value).subtract(12, 'hours').toDate());
    } else {
      onChange(moment(value).add(12, 'hours').toDate());
    }
  };

  const handleIncHour = () => {
    const h = moment(value).hours() + 1;
    if (h <= 23) {
      onChange(moment(value).hours(h).toDate());
    }
  };

  const handleDecHour = () => {
    const h = moment(value).hours() - 1;
    if (h >= 0) {
      onChange(moment(value).hours(h).toDate());
    }
  };

  return (
    <Box className={classes.root} {...boxProps}>
      <div className={classes.digit}>
        <IconButton className={classes.arrowButton} onClick={handleIncHour}>
          <ArrowDropUp />
        </IconButton>
        <div className={classes.inputWrapper}>
          <InputBase
            classes={{ input: classes.input }}
            type="number"
            inputProps={{ min: 0, max: 12 }}
            value={hour}
            onChange={handleHourChange}
          />
          <div className={classes.font}>h</div>
        </div>
        <IconButton className={classes.arrowButton} onClick={handleDecHour}>
          <ArrowDropDown />
        </IconButton>
      </div>
      <div className={classes.font}>:</div>
      <div className={classes.digit}>
        <IconButton
          className={classes.arrowButton}
          onClick={() =>
            handleMinChange({ target: { value: parseInt(min) + 1 } })
          }
        >
          <ArrowDropUp />
        </IconButton>
        <div className={classes.inputWrapper}>
          <InputBase
            classes={{ input: classes.input }}
            type="number"
            inputProps={{ min: 0, max: 59 }}
            value={min}
            onChange={handleMinChange}
          />
          <div className={classes.font}>m</div>
        </div>
        <IconButton
          className={classes.arrowButton}
          onClick={() =>
            handleMinChange({ target: { value: parseInt(min) - 1 } })
          }
        >
          <ArrowDropDown />
        </IconButton>
      </div>
      <div className={classes.ampm}>
        <ButtonBase
          className={clsx(classes.ampmButton, { [classes.ampmSelected]: am })}
          onClick={() => handleAmPmChange('am')}
          disabled={am}
        >
          AM
        </ButtonBase>
        <ButtonBase
          className={clsx(classes.ampmButton, { [classes.ampmSelected]: !am })}
          onClick={() => handleAmPmChange('pm')}
          disabled={!am}
        >
          PM
        </ButtonBase>
      </div>
    </Box>
  );
};

export default memo(TimePicker);
