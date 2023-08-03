import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, setSelectedDate } from 'redux/actions';
import { Card, CardContent } from '@material-ui/core';
import { Calendar, CardHeaderButton } from 'components';
import { Add as AddIcon } from '@material-ui/icons';
import { LINKS } from 'utils/constants';
import { useRouter } from 'next/router';
import { usePathIndicator } from 'hooks';

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedDate, alertStatus } = useSelector(
    (state) => state.notifications
  );

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleCreateNewsAlert = () => {
    router.push(LINKS.news.path);
  };

  const handlePickerChange = (year, month) => {
    dispatch(
      getNotifications(null, null, `${year}-${month}-01`, `${year}-${month}-31`)
    );
  };

  usePathIndicator(LINKS.home);

  return (
    <Card>
      <CardContent>
        <Calendar
          value={selectedDate}
          cellData={alertStatus}
          actions={
            <CardHeaderButton
              startIcon={<AddIcon />}
              onClick={handleCreateNewsAlert}
            >
              News Alert
            </CardHeaderButton>
          }
          onChange={handleDateChange}
          onPickerChange={handlePickerChange}
        />
      </CardContent>
    </Card>
  );
};

export default memo(Home);
