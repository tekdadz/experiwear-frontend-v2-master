import { Layout, Tickets, CurrentFanbandStats } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

export default function HomePage() {
  usePathIndicator(LINKS.tickets);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <Tickets />
    </Layout>
  );
}
