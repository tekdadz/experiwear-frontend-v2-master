import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { getGamedayPresets, getNotifications } from 'redux/actions';
import { AlertItem, Title } from 'components';
import { Button } from '@material-ui/core';
import { useAsyncAction } from 'hooks';
import { isEmpty } from 'utils/helpers';
import { ALERT_STATUS, ALERT_STATUS_LABELS } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  items: {
    overflow: 'auto',
    height: 0,
    marginBottom: 16,
    flexGrow: 1,
  },
  button: {
    borderRadius: theme.spacing(3),
    height: 50,
  },
}));

const AlertsSent = ({
  type,
  link = null,
  alertLink = null,
  status = ALERT_STATUS.sent,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const alerts = useSelector((state) =>
    state.notifications[type].results.filter((n) =>
      status === ALERT_STATUS.sent ? n.isSent : !n.isSent
    )
  );

  const handleViewAll = useCallback(() => {
    router.push(link);
  }, [router, link]);

  useAsyncAction(getNotifications(type), isEmpty(alerts));
  useAsyncAction(getGamedayPresets());

  return (
    <div className={classes.root}>
      <Title mb={4}>
        {type} Alerts {ALERT_STATUS_LABELS[status]}
      </Title>

      <div className={classes.items}>
        {alerts.map((item) => (
          <AlertItem key={item.id} data={item} mb={2} href={alertLink} />
        ))}
      </div>

      {link && (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          className={classes.button}
          onClick={handleViewAll}
        >
          View all
        </Button>
      )}
    </div>
  );
};

export default memo(AlertsSent);
