import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { createAlert } from 'redux/actions';
import { getEnglishDateWithTime } from 'utils/helpers';
import {
  GamedayThemeForm,
  LeftContainer,
  FHCard,
  FHCardHeader,
  FHCardContent,
} from 'components';
import { ALERT_PROTO_TYPES } from 'utils/constants';

const GamedayTheme = () => {
  const dispatch = useDispatch();

  const handleCreate = async (data) => {
    await dispatch(createAlert(ALERT_PROTO_TYPES.gameday, data));
  };

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title="Prepare Gameday Themes"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <FHCardContent>
          <GamedayThemeForm onSubmit={handleCreate} />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(GamedayTheme);
