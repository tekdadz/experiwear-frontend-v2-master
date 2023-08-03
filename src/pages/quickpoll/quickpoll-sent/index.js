import { Layout, CurrentFanbandStats, QuickPollSentAll } from 'components';
import { LINKS } from 'utils/constants';
import { usePathIndicator } from 'hooks';

const QuickPollAlertsSent = () => {
  usePathIndicator([LINKS.quickPoll, LINKS.quickPollSent]);

  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <QuickPollSentAll />
    </Layout>
  );
};

export default QuickPollAlertsSent;
