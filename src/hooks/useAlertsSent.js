import { Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import {
  getFanbandsStatistics,
  getGamedayPresets,
  getNotifications,
} from 'redux/actions';
import { Layout, AlertItem } from 'components';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CurrentFanbandStats } from 'components';
import { useAsyncAction } from 'hooks';
import { calcPercent, isEmpty } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
    marginTop: -92,
  },
  cell: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    letterSpacing: '0.48px',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
    height: 92,
  },
  divider: {
    height: 0,
    borderBottom: '1px solid #9ea3ba',
  },
}));

const useAlertsSent = (type, title) => {
  const classes = useStyles();
  const totalCount = useSelector(
    (state) => state.main.fanbands.statistics.total
  );

  const alerts = useSelector((state) =>
    state.notifications[type].results
      .filter((alert) => alert.isSent)
      .map((alert) => ({
        ...alert,
        aggr: {
          sent: {
            count: alert.sent,
            percent: calcPercent(alert.sent, totalCount),
          },
          open: {
            count: alert.opened,
            percent: calcPercent(alert.opened, totalCount),
          },
        },
      }))
  );

  useAsyncAction(getNotifications(type), isEmpty(alerts));
  useAsyncAction(getFanbandsStatistics(), !totalCount);
  useAsyncAction(getGamedayPresets());

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <Card className={classes.root}>
        <CardHeader title={title} />
        <CardContent>
          <table className={classes.table}>
            <thead>
              <tr>
                <td style={{ width: 300 }}></td>
                <th className={classes.cell}>sent</th>
                <th className={classes.cell}>open</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, idx) => (
                <Fragment key={alert.id}>
                  <tr>
                    <td className={classes.cell}>
                      <AlertItem data={alert} />
                    </td>
                    <td className={classes.cell}>
                      {alert.aggr.sent.count} <br /> {alert.aggr.sent.percent}%
                    </td>
                    <td className={classes.cell}>
                      {alert.aggr.open.count} <br /> {alert.aggr.open.percent}%
                    </td>
                  </tr>
                  {idx < alerts.length - 1 && (
                    <tr>
                      <td className={classes.divider} colSpan={3}></td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default useAlertsSent;
