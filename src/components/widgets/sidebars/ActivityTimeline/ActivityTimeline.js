import { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getGamedayPresets, getNotifications } from 'redux/actions';
import { AlertItem, Title } from 'components';
import { useAsyncAction } from 'hooks';
import { ALERT_MIXED_TYPES } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll',
    '&::scrollbar': {
      width: '0.6em',
    },
    '&::scrollbar-track': {
      'box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: theme.spacing(0.5),
    },
  },
}));

const ActivityTimeline = () => {
  const classes = useStyles();
  const alerts = useSelector((state) =>
    state.notifications[ALERT_MIXED_TYPES.all].results.filter((al) => al.isSent)
  );

  useAsyncAction(getNotifications());
  useAsyncAction(getGamedayPresets());

  return (
    <div className={classes.root}>
      <Title mb={4}>Activity Timeline</Title>
      <div className={classes.container}>
        {alerts.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} />
        ))}
      </div>
    </div>
  );
};

export default memo(ActivityTimeline);
