import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  cell: ({ minimized }) => ({
    fontFamily:
      theme.custom.fonts[minimized ? 'SFUITextMedium' : 'SFProTextRegular'],
    fontSize: minimized ? 13 : 14,
    color: '#989db3',
    textAlign: 'center',
  }),
}));

const CalendarHeader = ({ minimized }) => {
  const classes = useStyles({ minimized });
  const weekdays = useMemo(
    () => (minimized ? moment.weekdaysMin(true) : moment.weekdays(true)),
    [minimized]
  );
  return (
    <thead>
      <tr>
        {weekdays.map((day) => (
          <td key={day} className={classes.cell}>
            {day}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default CalendarHeader;
