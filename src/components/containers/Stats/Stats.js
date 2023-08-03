import { memo, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setPathTokens } from 'redux/actions/auxiliary';
import { LINKS } from 'utils/constants';
import { CurrentGame, Fanbands, LatestAlert, LatestSurvey } from './components';

const Stats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPathTokens([{ path: LINKS.stats.path, label: LINKS.stats.title }])
    );
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} xs={12}>
        <CurrentGame />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Fanbands />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LatestAlert />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LatestSurvey />
      </Grid>
    </Grid>
  );
};

export default memo(Stats);
