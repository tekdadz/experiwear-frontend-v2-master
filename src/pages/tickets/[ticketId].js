import { Layout, CurrentFanbandStats, TicketModify } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';
import { useRouter } from 'next/router';

const ModifyTickagePage = () => {
  const {
    query: { ticketId },
  } = useRouter();

  usePathIndicator([LINKS.tickets, LINKS.ticketModify]);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <TicketModify ticketId={ticketId} />
    </Layout>
  );
};

export default ModifyTickagePage;
