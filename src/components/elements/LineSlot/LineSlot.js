import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    marginLeft: 40,
    width: 'calc(100% - 40px)',
    height: 8,
    top: (props) => props.top,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.info.main,
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: theme.palette.info.main,
  },
}));

const LineSlot = ({
  datetime,
  offsetTime = null,
  offset = 0,
  unit = 60,
  step = 72,
}) => {
  const minutes = useMemo(() => {
    const unixTime = moment(datetime).valueOf();
    if (offsetTime) {
      return (unixTime - moment(offsetTime).valueOf()) / (1000 * 60);
    } else {
      return unixTime / (1000 * 60);
    }
  }, [datetime, offsetTime]);
  const top = useMemo(
    () => step * (minutes / unit) + offset,
    [minutes, unit, offset, step]
  );
  const classes = useStyles({ top: `${top - 4}px` });

  return (
    <div className={classes.root}>
      <div className={classes.circle} />
      <div className={classes.line} />
    </div>
  );
};

export default LineSlot;
