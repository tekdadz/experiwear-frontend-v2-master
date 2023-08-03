import { Layout, Saved, ActiveSavedAlerts } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function SavedPage() {
  usePathIndicator(LINKS.saved);

  return (
    <Layout sidebar={<ActiveSavedAlerts />}>
      <Saved />
    </Layout>
  );
}
