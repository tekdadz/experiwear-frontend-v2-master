import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const NewsAlertsSent = () => {
  usePathIndicator([LINKS.promo, LINKS.promoSent]);

  return useAlertsSent(ALERT_PROTO_TYPES.promo, 'Promo alerts sent');
};

export default NewsAlertsSent;
