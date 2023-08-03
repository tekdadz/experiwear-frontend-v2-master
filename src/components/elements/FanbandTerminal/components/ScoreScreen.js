import { useMemo } from 'react';
import { Box } from '@material-ui/core';
import { TeamLogo } from 'components';
import { isEmpty } from 'utils/helpers';
import ScreenFrame from './ScreenFrame';

const ScoreScreen = ({ game, text }) => {
  const [hawksTeam, opposingTeam] = useMemo(() => {
    if (isEmpty(game)) {
      return [null, null];
    }
    const homeTeam = { ...game.homeTeam, score: game.homeTeamScore };
    const visitorTeam = { ...game.visitorTeam, score: game.visitorTeamScore };
    return game.homeTeam.abbreviation === 'ATL'
      ? [homeTeam, visitorTeam]
      : [visitorTeam, homeTeam];
  }, [game]);

  if (!text || isEmpty(game)) {
    return <ScreenFrame />;
  }

  return (
    <ScreenFrame>
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        py={2}
      >
        <Box
          display="flex"
          overflow="hidden"
          alignItems="center"
          width="150%"
          height="36px"
        >
          <TeamLogo size={80} team={hawksTeam.abbreviation} />
          <TeamLogo size={80} team={opposingTeam.abbreviation} />
        </Box>
        <Box
          textAlign="center"
          fontSize="18px"
          color="#ffdb3c"
          display="flex"
          justifyContent="space-around"
          width="100%"
        >
          <span>{hawksTeam.score}</span>
          <span>-</span>
          <span>{opposingTeam.score}</span>
        </Box>
        <Box color="white" textAlign="center" fontSize="12px">
          <span style={{ textTransform: 'uppercase' }}>{text}</span>
        </Box>
      </Box>
    </ScreenFrame>
  );
};

export default ScoreScreen;
