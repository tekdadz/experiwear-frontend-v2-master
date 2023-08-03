import { Fragment } from 'react';
import { Calendar, ExpCheckbox, Title } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifications,
  setAlertToShow,
  setSelectedDate,
} from 'redux/actions';
import { ALERT_PROTO_TYPES, ALERT_PROTO_LABELS } from 'utils/constants';

const SelectedGameSidebar = () => {
  const dispatch = useDispatch();
  const {
    selectedDate,
    alertStatus: cellData,
    alertsToShow,
  } = useSelector((state) => state.notifications);

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
  };

  const handleVisibilityChange = (e) => {
    dispatch(setAlertToShow(e.target.name, e.target.checked));
  };

  const handlePickerChange = (year, month) => {
    dispatch(
      getNotifications(null, null, `${year}-${month}-01`, `${year}-${month}-31`)
    );
  };

  return (
    <Fragment>
      <Title mb={3}>Calendar</Title>
      <Calendar
        value={selectedDate}
        minimized={true}
        cellData={cellData}
        onChange={handleDateChange}
        onPickerChange={handlePickerChange}
        mb={4}
      />
      <Title mb={3}>Alerts to show</Title>
      {Object.values(ALERT_PROTO_TYPES).map((type) => (
        <ExpCheckbox
          key={type}
          label={ALERT_PROTO_LABELS[type]}
          color={type}
          name={type}
          checked={alertsToShow[type]}
          onChange={handleVisibilityChange}
        />
      ))}
    </Fragment>
  );
};

export default SelectedGameSidebar;
