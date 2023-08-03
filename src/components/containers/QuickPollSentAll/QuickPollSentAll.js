import { makeStyles } from '@material-ui/core';
import { getFanbandsStatistics, getNotifications } from 'redux/actions';
import clsx from 'clsx';
import { AlertItem, FHCard, FHCardContent, FHCardHeader } from 'components';
import { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { useAsyncAction } from 'hooks';
import { calcPercent, isEmpty } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
  },
  table: {
    tableLayout: 'fixed',
    width: '100%',
  },
  cell: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    letterSpacing: '0.48px',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: theme.spacing(1, 0),
  },
  divider: {
    height: 0,
    borderBottom: '1px solid #9ea3ba',
  },
  color0: {
    color: '#53c76e',
  },
  color1: {
    color: '#d02231',
  },
  color2: {
    color: '#53c76e',
  },
}));

const QuickPollAlertsSent = () => {
  const classes = useStyles();
  const alerts = useSelector((state) =>
    state.notifications.survey.results
      .filter((alert) => alert.isSent)
      .map((alert) => ({
        ...alert,
        surveyResponses: alert.surveyResponses.slice(0, 5),
      }))
  );
  const totalCount = useSelector(
    (state) => state.main.fanbands.statistics.total
  );

  const maxResNum = useMemo(
    () =>
      alerts.reduce(
        (maxNum, alert) =>
          maxNum < alert.surveyResponses.length
            ? alert.surveyResponses.length
            : maxNum,
        0
      ),
    [alerts]
  );

  const surveys = useMemo(
    () =>
      alerts.map((alert) => {
        const resNum = alert.surveyResponses.reduce(
          (num, { count = 0 }) => num + count,
          0
        );

        return {
          ...alert,
          aggr: {
            ...alert.surveyResponses.reduce(
              (acc, { response: res, count = 0 }) => ({
                ...acc,
                [res]: { count, percent: calcPercent(count, resNum) },
              }),
              {}
            ),
            sent: {
              count: alert.sent,
              percent: calcPercent(alert.sent, totalCount),
            },
            open: {
              count: alert.opened,
              percent: calcPercent(alert.opened, totalCount),
            },
          },
        };
      }),
    [alerts, totalCount]
  );

  useAsyncAction(getNotifications(ALERT_PROTO_TYPES.survey), isEmpty(alerts));
  useAsyncAction(getFanbandsStatistics(), !totalCount);

  return (
    <FHCard className={classes.root}>
      <FHCardHeader title="Quick Poll ALERTS SENT" />
      <FHCardContent>
        <table className={classes.table}>
          <thead>
            <tr>
              <th style={{ width: 200 }}></th>
              <th colSpan={maxResNum}></th>
              <th className={classes.cell}>sent</th>
              <th className={classes.cell}>open</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((alert, rowIdx) => (
              <Fragment key={alert.id}>
                <tr>
                  <td className={classes.cell}>
                    <AlertItem data={alert} href={LINKS.quickPollSample.path} />
                  </td>
                  {alert.surveyResponses.map(({ response: res }, idx) => (
                    <td
                      key={res}
                      className={clsx(
                        classes.cell,
                        classes[`color${Math.min(idx, 2)}`]
                      )}
                    >
                      {res} <br />
                      {alert.aggr?.[res].count} <br />
                      {alert.aggr?.[res].percent}%
                    </td>
                  ))}
                  {Array.from({
                    length: maxResNum - alert.surveyResponses.length,
                  }).map((_, idx) => (
                    <td key={idx} className={classes.cell} />
                  ))}
                  <td className={classes.cell}>
                    {alert.aggr.sent.count} <br /> {alert.aggr.sent.percent}%
                  </td>
                  <td className={classes.cell}>
                    {alert.aggr.open.count} <br /> {alert.aggr.open.percent}%
                  </td>
                </tr>
                {rowIdx < surveys.length - 1 && (
                  <tr>
                    <td
                      className={classes.divider}
                      colSpan={maxResNum + 3}
                    ></td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </FHCardContent>
    </FHCard>
  );
};

export default QuickPollAlertsSent;
