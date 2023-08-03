import { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from 'redux/actions';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from '@material-ui/core';
import TimelineDetailed from 'components/elements/TimelineDetailed';
import moment from 'moment';
import { Add } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { setPathTokens } from 'redux/actions/auxiliary';
import { getEnglishDate, getEnglishDateWithTime } from 'utils/helpers';
import { LINKS } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  newsAlertButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  cardContent: {
    height: 'calc(100% - 60px)',
  },
}));

const SelectedGame = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const {
    selectedDate,
    all: { results: notifications },
    alertsToShow,
  } = useSelector((state) => state.notifications);
  const slots = useMemo(
    () =>
      notifications.filter(
        (n) =>
          moment(n.createdAt).isSame(moment(selectedDate), 'day') &&
          alertsToShow[n.type] &&
          n.isSent
      ),
    [notifications, selectedDate, alertsToShow]
  );

  const handleCreateNewsAlert = () => {
    router.push(LINKS.news.path);
  };

  useEffect(() => {
    dispatch(getNotifications());
    dispatch(
      setPathTokens([
        LINKS.home,
        { path: LINKS.home.path, title: getEnglishDateWithTime(selectedDate) },
      ])
    );
  }, [dispatch, selectedDate]);

  return (
    <Card>
      <CardHeader
        title={`ALERT SCHEDULED FOR ${getEnglishDate(selectedDate)}`}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            className={classes.newsAlertButton}
            onClick={handleCreateNewsAlert}
          >
            News Alert
          </Button>
        }
      />
      <CardContent className={classes.cardContent}>
        <TimelineDetailed slots={slots} />
      </CardContent>
    </Card>
  );
};

export default memo(SelectedGame);
