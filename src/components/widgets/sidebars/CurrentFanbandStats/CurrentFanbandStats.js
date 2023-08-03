import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from 'components';
import { useAsyncAction } from 'hooks';
import { getFanbandsStatistics } from 'redux/actions';
import { isEmpty } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  text: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    color: '#333',
    fontSize: 14,
  },
  green: {
    color: theme.palette.info.main,
  },
  red: {
    color: theme.palette.danger.main,
  },
}));

const CurrentFanbandStats = () => {
  const classes = useStyles();
  const { statistics = {} } = useSelector((state) => state.main.fanbands);

  useAsyncAction(getFanbandsStatistics(), isEmpty(statistics));

  return (
    <div className={classes.root}>
      <Title mb={4}>Current Fanband Stats</Title>

      <div className={classes.item}>
        <Typography className={classes.text}>
          Total Provisioned Fanbands
        </Typography>
        <Typography className={classes.text}>
          {statistics?.total?.toLocaleString()}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography className={classes.text}>
          Total Fanbands <span className={classes.green}>Online</span> Now
        </Typography>
        <Typography className={classes.text}>
          {statistics?.online?.toLocaleString()}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography className={classes.text}>
          Total Fanbands <span className={classes.red}>Offline</span> Now
        </Typography>
        <Typography className={classes.text}>
          {statistics?.offline?.toLocaleString()}
        </Typography>
      </div>

      <div className={classes.item}>
        <Typography className={classes.text}>
          Total Fanbands <span className={classes.green}>Online In Arena</span>
        </Typography>
        <Typography className={classes.text}>
          {statistics?.inArea?.toLocaleString()}
        </Typography>
      </div>
    </div>
  );
};

export default memo(CurrentFanbandStats);
