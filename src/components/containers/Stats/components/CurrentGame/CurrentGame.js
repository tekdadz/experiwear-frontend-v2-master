import { memo, useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { TeamLogo, GameSelectDialog } from 'components';
import { useSelector } from 'react-redux';
import { GAME_STATUS } from 'utils/constants';
import { getEnglishDateWithTime, isEmpty } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 220,
  },
  button: {
    borderRadius: theme.spacing(3),
    height: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  teamName: {
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
  vs: {
    color: theme.palette.info.main,
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 18,
  },
  score: {
    fontSize: 20,
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontWeight: 'bold',
  },
}));

const CurrentGame = () => {
  const classes = useStyles();
  const selectedGame = useSelector((state) => state.games.selectedGame);
  const [openGamedayDialog, setOpenGamedayDialog] = useState(false);
  const showScore = useMemo(
    () =>
      selectedGame?.gameStatus === GAME_STATUS.finished ||
      selectedGame?.gameStatus === GAME_STATUS.inProgress,
    [selectedGame]
  );
  const statusText = useMemo(() => {
    if (isEmpty(selectedGame)) {
      return '';
    }

    if (selectedGame.gameStatus === GAME_STATUS.scheduled) {
      return getEnglishDateWithTime(selectedGame.startTime);
    } else {
      return selectedGame.gameStatusText;
    }
  }, [selectedGame]);

  const handleSelectGameday = (e) => {
    e.preventDefault();
    setOpenGamedayDialog(true);
  };

  const handleCloseGamedayDialog = () => {
    setOpenGamedayDialog(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Current Game" subheader={statusText} />
      <CardContent className={classes.content}>
        {isEmpty(selectedGame) ? (
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSelectGameday}
          >
            Select Gameday
          </Button>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <Box display="flex" alignItems="center" flexDirection="column">
                <TeamLogo
                  size={80}
                  team={selectedGame.visitorTeam.abbreviation}
                />
                <Typography className={classes.teamName}>
                  {selectedGame.visitorTeam.name}
                </Typography>
              </Box>
              {showScore && (
                <Typography className={classes.score}>
                  {selectedGame.visitorTeamScore}
                </Typography>
              )}
            </Box>
            <Typography className={classes.vs}>VS</Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {showScore && (
                <Typography className={classes.score}>
                  {selectedGame.homeTeamScore}
                </Typography>
              )}
              <Box display="flex" alignItems="center" flexDirection="column">
                <TeamLogo size={80} team={selectedGame.homeTeam.abbreviation} />
                <Typography className={classes.teamName}>
                  {selectedGame.homeTeam.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <GameSelectDialog
          open={openGamedayDialog}
          onClose={handleCloseGamedayDialog}
        />
      </CardContent>
    </Card>
  );
};

export default memo(CurrentGame);
