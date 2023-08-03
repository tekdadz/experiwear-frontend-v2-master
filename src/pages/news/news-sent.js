import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([LINKS.news, LINKS.newsSent]);

  return useAlertsSent(ALERT_PROTO_TYPES.news, 'News alerts sent');
};

export default NewsAlertsSent;
