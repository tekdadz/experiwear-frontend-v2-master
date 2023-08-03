import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import { setSelectedGame, getGames } from 'redux/actions/games';
import { useDispatch, useSelector } from 'react-redux';
import { getEnglishDateWithTime, isEmpty } from 'utils/helpers';
import { TeamLogo } from 'components';
import { useAsyncAction } from 'hooks';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 387,
    height: 48,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-selectMenu': {
      fontFamily: theme.custom.fonts.SFUITextRegular,
      fontSize: 14,
      color: theme.custom.palette.textGrey,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    },
    [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
      width: '100%',
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    fontWeight: 500,
    color: '#000',
  },
}));

const GameSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { results: games = [], selectedGame } = useSelector(
    (state) => state.games
  );
  const handleGameSelect = (e) => {
    dispatch(setSelectedGame(games.find((g) => g.id === e.target.value)));
  };

  useAsyncAction(getGames(), isEmpty(games));

  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={selectedGame?.id || ''}
      onChange={handleGameSelect}
    >
      <MenuItem value="" disabled>
        Select Gameday
      </MenuItem>
      {games.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <Box className={classes.menuItem}>
            <TeamLogo team={item.visitorTeam.abbreviation} />
            <Box>{item.visitorTeam.name}</Box>
            <Box px={1} color="#01a1c3">
              @
            </Box>
            <TeamLogo team={item.homeTeam.abbreviation} />
            <Box>{item.homeTeam.name}</Box>
            <Box color="textSecondary">
              &nbsp;({getEnglishDateWithTime(item.date)})
            </Box>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default GameSelector;
