import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH } from 'utils/constants';
import PathIndicator from 'components/widgets/layout/PathIndicator';
import GameSelector from 'components/widgets/pickers/GameSelector';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
      marginBottom: theme.spacing(2),
    },
  },
  mark: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

const AppBar = ({ onToggleMenu }) => {
  const classes = useStyles();
  const mobileMatched = useMediaQuery((theme) =>
    theme.breakpoints.down(MOBILE_BREAKPOINT)
  );

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        item
        {...{ [MOBILE_BREAKPOINT]: 'auto' }}
        xl="auto"
        xs={12}
        container={mobileMatched}
        {...(mobileMatched && {
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <PathIndicator />
        {mobileMatched && (
          <IconButton onClick={onToggleMenu}>
            <MenuIcon />
          </IconButton>
        )}
      </Grid>
      <Grid
        item
        {...{ [MOBILE_BREAKPOINT]: 'auto' }}
        xl="auto"
        className={classes.mark}
      >
        <img src={TEMP_TEAM_HAWKS_SMALL_IMAGE_PATH} width={38} height={40} />
      </Grid>
      <Grid item {...{ [MOBILE_BREAKPOINT]: 'auto' }} xl="auto" xs={12}>
        <GameSelector />
      </Grid>
    </Grid>
  );
};

export default AppBar;
