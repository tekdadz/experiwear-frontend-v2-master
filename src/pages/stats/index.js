import { Layout, Stats, ActivityTimeline } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function StatsPage() {
  usePathIndicator(LINKS.stats);

  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Stats />
    </Layout>
  );
}
