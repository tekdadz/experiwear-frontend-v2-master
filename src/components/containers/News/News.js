import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { createAlert } from 'redux/actions';
import { getEnglishDateWithTime } from 'utils/helpers';
import {
  NewsForm,
  LeftContainer,
  FHCard,
  FHCardHeader,
  FHCardContent,
} from 'components';
import { ALERT_PROTO_TYPES } from 'utils/constants';

const News = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_PROTO_TYPES.news, data));
  };

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title="Create News Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <FHCardContent>
          <NewsForm onSubmit={handleCreate} />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(News);
