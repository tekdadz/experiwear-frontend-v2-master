import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { getEnglishDateWithTime } from 'utils/helpers';
import { ALERT_PROTO_TYPES } from 'utils/constants';
import {
  QuickPollForm,
  LeftContainer,
  FHCard,
  FHCardContent,
  FHCardHeader,
} from 'components';
import { createAlert } from 'redux/actions';

const QuickPoll = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_PROTO_TYPES.survey, data));
  };

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title="Create Quick Poll Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <FHCardContent>
          <QuickPollForm onSubmit={handleCreate} />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(QuickPoll);
