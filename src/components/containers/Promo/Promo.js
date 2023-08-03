import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_PROTO_TYPES } from 'utils/constants';
import {
  PromoForm,
  LeftContainer,
  FHCard,
  FHCardContent,
  FHCardHeader,
} from 'components';
import { createAlert } from 'redux/actions';

const Promo = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_PROTO_TYPES.promo, data));
  };

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title="Create Promo Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <FHCardContent>
          <PromoForm onSubmit={handleCreate} />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(Promo);
