import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { getLatestNotification } from 'redux/actions';
import { Title, CircleIcon } from 'components';
import { DOUGHNUT_OPTIONS } from './constants';
import { useAsyncAction } from 'hooks';
import { calcPercent } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  footer: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  chart: {
    marginTop: theme.spacing(3),
    position: 'relative',
    height: 'fit-content',
  },
  chartLabel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  sent: {
    fontFamily: theme.custom.fonts.SFUITextSemibold,
    fontSize: 36,
    color: '#394659',
  },
  total: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 16,
    color: '#cbd2d5',
  },
  label: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    marginLeft: theme.spacing(3),
  },
  title: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 16,
    color: '#333',
  },
}));

const LatestAlert = () => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    latest: { received = 0, sent = 0, title = '' },
  } = useSelector((state) => state.notifications);
  const chartColors = useMemo(
    () => [theme.palette.promo.main, theme.palette.survey.main],
    [theme]
  );
  const chartData = useMemo(
    () => ({
      labels: [`Received`, `No Received`],
      datasets: [
        {
          data: [received, sent - received],
          backgroundColor: chartColors,
        },
      ],
    }),
    [received, sent, chartColors]
  );

  useAsyncAction(getLatestNotification());

  return (
    <Card className={classes.root}>
      <CardHeader title={<Title>Latest Alert</Title>} />
      <CardContent>
        <div className={classes.container}>
          <div className={classes.chart}>
            <div className={classes.chartLabel}>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.sent}
              >
                {sent}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.total}
              >
                Sent
              </Typography>
            </div>
            <Doughnut
              data={chartData}
              options={DOUGHNUT_OPTIONS}
              width={200}
              height={200}
            />
          </div>
          <div className={classes.footer}>
            <Box mb={2}>
              <Typography className={classes.title}>{title}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.promo.main} />
              <Typography className={classes.label}>
                Received&nbsp;({calcPercent(received, sent)}%)
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CircleIcon color={theme.palette.survey.main} />
              <Typography className={classes.label}>
                Not Received&nbsp;({calcPercent(sent - received, sent)}%)
              </Typography>
            </Box>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LatestAlert);
