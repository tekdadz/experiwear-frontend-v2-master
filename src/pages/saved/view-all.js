import { SavedAlertsAll, Layout } from 'components';
import { usePathIndicator } from 'hooks';
import { LINKS } from 'utils/constants';

const SavedAlertsPage = () => {
  usePathIndicator([LINKS.saved, LINKS.savedAll]);

  return (
    <Layout>
      <SavedAlertsAll />
    </Layout>
  );
};

export default SavedAlertsPage;
