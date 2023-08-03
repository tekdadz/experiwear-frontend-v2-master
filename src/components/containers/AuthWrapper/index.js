import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BandLogo, ExpLoading } from 'components';
import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
    minHeight: '100vh',
    padding: theme.spacing(0, 4),
  },
  container: {
    width: '100%',
    maxWidth: 1170,
    minHeight: 649,
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50% 100%',
    backgroundPosition: 'left',
    [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
      padding: theme.spacing(2),
      background: 'none',
    },
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(6, 6),
  },
  imgSection: {
    [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
      display: 'none',
    },
  },
  bandLogo: {},
  logo: {
    marginTop: theme.spacing(4),
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: theme.spacing(4, 0),
  },
}));

const AuthWrapper = ({ title, children }) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector((state) => state.aux);

  return (
    <div className={classes.root}>
      {loadingStatus && <ExpLoading loading={loadingStatus} />}
      <Paper className={classes.container}>
        <Grid container>
          <Grid item md={6} className={classes.imgSection} />
          <Grid item xs={12} md={6} className={classes.formSection}>
            <BandLogo className={classes.bandLogo} />
            <Typography color="textPrimary" className={classes.title}>
              {title}
            </Typography>
            {children}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default memo(AuthWrapper);
