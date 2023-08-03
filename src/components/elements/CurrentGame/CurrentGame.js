import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TeamLogo } from 'components';
import { getEnglishDate, isEmpty } from 'utils/helpers';
import { LINKS } from 'utils/constants';
import Title from '../Title';

const useStyles = makeStyles((theme) => ({
  root: {},
  date: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.48,
    color: theme.palette.info.main,
  },
  teamName: {
    marginLeft: 14,
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
  score: {
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 14,
    letterSpacing: 0.28,
    color: '#000',
  },
}));

const CurrentGame = () => {
  const classes = useStyles();
  const router = useRouter();

  const { closestUpcoming } = useSelector((state) => state.games);

  if (isEmpty(closestUpcoming)) {
    return null;
  }

  const handleClick = () => {
    router.push(LINKS.stats.path);
  };

  return (
    <div className={classes.root}>
      <Title mb={2}>Today is {getEnglishDate(new Date())}</Title>
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        mb="19px"
      >
        <Typography className={classes.date}>
          Next game: <br />
          {getEnglishDate(closestUpcoming.date)}
        </Typography>
        <Link component="button" variant="body2" onClick={handleClick}>
          More info
        </Link>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="26px"
      >
        <Box display="flex" alignItems="center">
          <TeamLogo size={28} team={closestUpcoming.visitorTeam.abbreviation} />
          <Typography className={classes.teamName}>
            {closestUpcoming.visitorTeam.name}
          </Typography>
        </Box>
        <Typography color="textPrimary" className={classes.score}>
          {closestUpcoming.visitorTeamScore}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="26px"
      >
        <Box display="flex" alignItems="center">
          <TeamLogo size={28} team={closestUpcoming.homeTeam.abbreviation} />
          <Typography className={classes.teamName}>
            {closestUpcoming.homeTeam.name}
          </Typography>
        </Box>
        <Typography color="textPrimary" className={classes.score}>
          {closestUpcoming.homeTeamScore}
        </Typography>
      </Box>
    </div>
  );
};

export default memo(CurrentGame);
