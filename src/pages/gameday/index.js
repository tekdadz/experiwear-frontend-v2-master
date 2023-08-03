import {
  Layout,
  GamedayTheme,
  CurrentFanbandStats,
  AlertsSent,
} from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

export default function GamedayThemePage() {
  usePathIndicator(LINKS.gameday);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_PROTO_TYPES.gameday}
            link={LINKS.gamedaySent.path}
          />
        </>
      }
    >
      <GamedayTheme />
    </Layout>
  );
}
