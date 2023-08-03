import { withStyles, Slider } from '@material-ui/core';

export const AccSlider = withStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
  },
  track: {
    height: 18,
    borderRadius: 9,
  },
  rail: {
    height: 18,
    borderRadius: 9,
    backgroundColor: '#9ea3ba',
    opacity: 1,
  },
  mark: {
    display: 'none',
  },
  markLabel: {
    display: 'none',
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    top: 40,
    left: 'unset',
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
  thumb: {
    width: 41,
    height: 41,
    marginTop: -10,
    marginLeft: -10,
    border: '10px solid #fff',
    color: theme.palette.info.main,
    boxShadow: 'none !important',
  },
}))(Slider);
