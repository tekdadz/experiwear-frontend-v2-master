import { Layout, News, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

export default function NewsPage() {
  usePathIndicator(LINKS.news);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_PROTO_TYPES.news}
            link={LINKS.newsSent.path}
          />
        </>
      }
    >
      <News />
    </Layout>
  );
}
