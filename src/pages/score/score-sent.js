import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { useAlertsSent, usePathIndicator } from 'hooks';

const ScoreSentPage = () => {
  usePathIndicator([LINKS.score, LINKS.scoreSent]);

  return useAlertsSent(ALERT_PROTO_TYPES.score, 'Score alerts sent');
};

export default ScoreSentPage;
