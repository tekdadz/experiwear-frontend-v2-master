import { useState } from 'react';
import { CalendarHeader } from './components';
import moment from 'moment';
import CalendarBody from './components/CalendarBody';
import { Box, makeStyles, useMediaQuery } from '@material-ui/core';
import CalendarPicker from './components/CalendarPicker';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';

const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
  },
}));

const Calendar = ({
  value = null,
  cellData = {},
  actions = null,
  onChange = () => {},
  onPickerChange = () => {},
  minimized = false,
  ...boxProps
}) => {
  const mobileView = useMediaQuery((theme) =>
    theme.breakpoints.down(MOBILE_BREAKPOINT)
  );
  const tinyMode = minimized || mobileView;
  const classes = useStyles({ minimized: tinyMode });
  const [year, setYear] = useState(parseInt(moment(value).format('YYYY')));
  const [month, setMonth] = useState(parseInt(moment(value).format('MM')));

  const handlePickerChange = (year, month) => {
    setYear(year);
    setMonth(month);
    onPickerChange(year, month);
  };

  return (
    <Box {...boxProps}>
      <CalendarPicker
        year={year}
        month={month}
        actions={tinyMode ? null : actions}
        minimized={tinyMode}
        onChange={handlePickerChange}
      />
      <table className={classes.table}>
        <CalendarHeader minimized={tinyMode} />
        <CalendarBody
          year={year}
          month={month}
          date={value}
          cellData={cellData}
          minimized={tinyMode}
          onChange={onChange}
        />
      </table>
    </Box>
  );
};

export default Calendar;
