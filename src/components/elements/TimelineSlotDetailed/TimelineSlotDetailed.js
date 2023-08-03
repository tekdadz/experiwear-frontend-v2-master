import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useMemo } from 'react';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { conv2time } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: 146,
    height: 58,
    top: (props) => props.top,
    left: (props) => `calc(${props.left}%)`,
    backgroundColor: (props) =>
      alpha(theme.palette?.[props.type]?.main || theme.palette.info.main, 0.2),
    borderRadius: 10,
    padding: 6,
  },
  image: {
    backgroundImage: (props) => `url(${props.imageUrl})`,
    backgroundSize: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
    float: 'left',
    marginRight: 10,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#121212',
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 12,
    width: '100%',
    height: 32,
    overflowWrap: 'break-word',
    overflow: 'hidden',
  },
  time: {
    color: '#9ea3ba',
    fontSize: 12,
    fontFamily: theme.custom.fonts.SFUITextRegular,
  },
}));

const TimelineSlotDetailed = ({
  type,
  datetime,
  title,
  imageUrl = null,
  offsetTime = null,
  offset,
  unit,
  step,
}) => {
  const minutes = useMemo(() => {
    const time = conv2time(datetime);
    if (offsetTime) {
      return time.diff(conv2time(offsetTime), 'minutes', true);
    } else {
      return time.minutes() + time.hours() * 60;
    }
  }, [datetime, offsetTime]);
  const top = useMemo(
    () => Math.floor(step * Math.floor(minutes / unit) + offset),
    [minutes, unit, offset, step]
  );
  const left = useMemo(
    () => Math.floor((100 * (minutes % unit)) / unit),
    [minutes, unit]
  );
  const classes = useStyles({ type, top, left, imageUrl });

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <div className={classes.time}>{moment(datetime).format('HH:mm')}</div>
      </div>
    </div>
  );
};

export default TimelineSlotDetailed;
