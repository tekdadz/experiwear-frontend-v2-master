import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_PROTO_TYPES } from 'utils/constants';
import { createAlert } from 'redux/actions';
import {
  ScoreForm,
  LeftContainer,
  FHCard,
  FHCardContent,
  FHCardHeader,
} from 'components';

const Score = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_PROTO_TYPES.score, data));
  };

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title="Create Score Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <FHCardContent>
          <ScoreForm onSubmit={handleCreate} />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(Score);
