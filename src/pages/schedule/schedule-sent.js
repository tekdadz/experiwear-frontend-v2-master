import { ALERT_MIXED_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScheduledSentPage = () => {
  usePathIndicator([LINKS.schedule, LINKS.scheduleSent]);

  return useAlertsSent(ALERT_MIXED_TYPES.scheduled, 'Active scheduled alerts');
};

export default ScheduledSentPage;
