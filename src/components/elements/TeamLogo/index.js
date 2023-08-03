import { memo } from 'react';
import * as NBAIcons from 'react-nba-logos';

const TeamLogo = ({ size = 30, team }) => {
  const NBALogo = NBAIcons?.[team] || NBAIcons.ATL;

  return <NBALogo size={size} />;
};

export default memo(TeamLogo);
