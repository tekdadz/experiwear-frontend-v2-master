import { Layout, QuickPoll, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
  usePathIndicator(LINKS.quickPoll);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_PROTO_TYPES.survey}
            link={LINKS.quickPollSent.path}
          />
        </>
      }
    >
      <QuickPoll />
    </Layout>
  );
}
