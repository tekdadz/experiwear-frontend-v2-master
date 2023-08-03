import { Layout, Fanbands, ActivityTimeline } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function FanbandsPage() {
  usePathIndicator([LINKS.stats, LINKS.statsFanbands]);

  return (
    <Layout sidebar={<ActivityTimeline />}>
      <Fanbands />
    </Layout>
  );
}
