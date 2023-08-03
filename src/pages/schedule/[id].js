import { Layout, Schedule, CurrentFanbandStats, AlertsSent } from 'components';
import { useAsyncAction, usePathIndicator } from 'hooks';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getNotifications } from 'redux/actions';
import {
  ALERT_MIXED_TYPES,
  ALERT_STATUS,
  ALERT_FORM_MODES,
  LINKS,
} from 'utils/constants';
import { isEmpty } from 'utils/helpers';

export default function EditScheduledAlertPage() {
  const {
    query: { id },
  } = useRouter();
  const alert = useSelector((state) =>
    state.notifications[ALERT_MIXED_TYPES.scheduled].results.find(
      (a) => a.id === id
    )
  );

  usePathIndicator([LINKS.schedule, LINKS.scheduledEdit]);
  useAsyncAction(getNotifications(ALERT_MIXED_TYPES.scheduled), isEmpty(alert));

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_MIXED_TYPES.scheduled}
            status={ALERT_STATUS.pending}
            alertLink={LINKS.scheduledEdit.path}
          />
        </>
      }
    >
      {alert && (
        <Schedule
          defaultValues={alert}
          key={id}
          mode={ALERT_FORM_MODES.updating}
        />
      )}
    </Layout>
  );
}
