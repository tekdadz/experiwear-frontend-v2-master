import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const GamedayAlertsSent = () => {
  usePathIndicator([LINKS.gameday, LINKS.gamedaySent]);

  return useAlertsSent(ALERT_PROTO_TYPES.gameday, 'Gameday alerts sent');
};

export default GamedayAlertsSent;
