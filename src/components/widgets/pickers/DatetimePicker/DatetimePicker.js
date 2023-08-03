import { memo } from 'react';
import { Box, Popover } from '@material-ui/core';
import { Calendar, TimePicker, Title } from 'components';
import { useSelector } from 'react-redux';

const DatetimePicker = ({
  anchorEl,
  onClose,
  value,
  onChange,
  ...boxProps
}) => {
  const cellData = useSelector((state) => state.notifications.alertStatus);

  return (
    <Popover
      onClose={onClose}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2} width={420} {...boxProps}>
        <Title mb={4}>Date</Title>
        <Calendar
          cellData={cellData}
          minimized
          value={value}
          onChange={onChange}
          mb={4}
        />
        <Title>Time</Title>
        <TimePicker value={value} onChange={onChange} pr={10} mb={1} />
      </Box>
    </Popover>
  );
};

export default memo(DatetimePicker);
