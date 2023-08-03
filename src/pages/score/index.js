import { Layout, Score, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

export default function ScorePage() {
  usePathIndicator(LINKS.score);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_PROTO_TYPES.score}
            link={LINKS.scoreSent.path}
          />
        </>
      }
    >
      <Score />
    </Layout>
  );
}
