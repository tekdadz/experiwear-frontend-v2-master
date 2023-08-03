import { Layout, Promo, CurrentFanbandStats, AlertsSent } from 'components';
import { usePathIndicator } from 'hooks';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

export default function PromoPage() {
  usePathIndicator(LINKS.promo);

  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <AlertsSent
            type={ALERT_PROTO_TYPES.promo}
            link={LINKS.promoSent.path}
          />
        </>
      }
    >
      <Promo />
    </Layout>
  );
}
