import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useMemo } from 'react';
import { alpha } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    marginLeft: 55,
    width: 'calc(100% - 55px)',
    height: 54,
    top: (props) => props.top,
    backgroundColor: (props) => alpha(theme.palette?.[props.type].main, 0.2),
    borderRadius: 10,
    padding: theme.spacing(0, 2),
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#121212',
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 16,
    maxWidth: 190,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  time: {},
}));

const TimelineSlot = ({
  type,
  datetime,
  title,
  offsetTime = null,
  offset = 0,
  unit = 60,
  step = 72,
}) => {
  const minutes = useMemo(() => {
    const unixTime = moment(datetime).valueOf();
    if (offsetTime) {
      const diff = unixTime - moment(offsetTime).valueOf();
      return diff / (1000 * 60);
    } else {
      return unixTime / (1000 * 60);
    }
  }, [datetime, offsetTime]);
  const top = useMemo(
    () => Math.floor(step * (minutes / unit) + offset),
    [minutes, unit, offset, step]
  );
  const classes = useStyles({ type, top });

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <div className={classes.time}>
          ({moment(datetime).format('HH:mm:ss')})
        </div>
      </div>
    </div>
  );
};

export default TimelineSlot;
