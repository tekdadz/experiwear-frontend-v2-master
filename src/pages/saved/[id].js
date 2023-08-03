import { Layout, Saved, ActiveSavedAlerts } from 'components';
import { useAsyncAction, usePathIndicator } from 'hooks';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getSavedAlerts } from 'redux/actions';
import { ALERT_MIXED_TYPES, LINKS } from 'utils/constants';
import { isEmpty } from 'utils/helpers';

export default function EditSavedAlertPage() {
  const {
    query: { id },
  } = useRouter();
  const alert = useSelector((state) =>
    state.notifications[ALERT_MIXED_TYPES.saved].results.find(
      (a) => a.id === id
    )
  );

  usePathIndicator([LINKS.saved, LINKS.savedAll, LINKS.savedEdit]);
  useAsyncAction(getSavedAlerts(), isEmpty(alert));

  return (
    <Layout sidebar={<ActiveSavedAlerts />}>
      {alert && <Saved defaultValues={alert} key={id} updating />}
    </Layout>
  );
}
