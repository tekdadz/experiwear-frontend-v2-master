import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  List,
  ListItem,
} from '@material-ui/core';

import { setSelectedGame, getGames } from 'redux/actions/games';
import { useDispatch, useSelector } from 'react-redux';
import { getEnglishDateWithTime, isEmpty } from 'utils/helpers';
import { TeamLogo, Title, FormButton } from 'components';
import { useAsyncAction } from 'hooks';
import { useState } from 'react';

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

const GameSelectDialog = ({ open = false, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { results: games = [] } = useSelector((state) => state.games);
  const [game, setGame] = useState(null);

  const handleConfirm = () => {
    dispatch(setSelectedGame(game));
    onClose();
  };

  useAsyncAction(getGames(), isEmpty(games));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="gameday-dialog-title"
      aria-describedby="gameday-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="gameday-dialog-title">
        <Title>Select Gameday</Title>
      </DialogTitle>
      <DialogContent>
        <List>
          {games.map((item) => (
            <ListItem
              key={item.id}
              className={classes.menuItem}
              onClick={() => setGame(item)}
              button
              selected={item.id === game?.id}
            >
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
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <FormButton onClick={handleConfirm}>Confirm</FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default GameSelectDialog;
