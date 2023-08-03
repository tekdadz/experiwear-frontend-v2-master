import { Layout, Schedule, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_MIXED_TYPES, ALERT_STATUS, LINKS } from 'utils/constants';

export default function SchedulePage() {
  usePathIndicator(LINKS.schedule);

  return (
    <Layout
      sidebar={
        <>
          <AlertsSent
            type={ALERT_MIXED_TYPES.scheduled}
            status={ALERT_STATUS.pending}
            alertLink={LINKS.scheduledEdit.path}
          />
          <AlertsSent
            type={ALERT_MIXED_TYPES.scheduled}
            link={LINKS.scheduleSent.path}
          />
        </>
      }
    >
      <Schedule />
    </Layout>
  );
}
