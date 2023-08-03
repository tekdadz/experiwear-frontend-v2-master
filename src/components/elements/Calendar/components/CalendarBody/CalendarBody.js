import { useMemo } from 'react';
import { layoutDaysOfMonth } from 'utils/helpers';
import moment from 'moment';
import CalendarCell from '../CalendarCell';

const CalendarBody = ({
  year,
  month,
  date,
  cellData = {},
  onChange,
  minimized,
}) => {
  const layoutDays = useMemo(
    () => layoutDaysOfMonth(year, month),
    [year, month]
  );

  const handleDaySelect = (day) => {
    onChange(
      moment(date)
        .set({ year, month: month - 1, date: day })
        .toDate()
    );
  };

  return (
    <tbody>
      {Array.from({ length: 6 }).map(
        (_, row) =>
          (!row || layoutDays[row][0]) && (
            <tr key={row}>
              {layoutDays[row].map((day, idx) => (
                <CalendarCell
                  day={day}
                  key={idx}
                  data={
                    cellData?.[
                      moment(new Date(year, month - 1, day)).format(
                        'YYYY-MM-DD'
                      )
                    ]
                  }
                  selected={moment(new Date(year, month - 1, day)).isSame(
                    moment(date),
                    'day'
                  )}
                  onSelect={handleDaySelect}
                  minimized={minimized}
                />
              ))}
            </tr>
          )
      )}
    </tbody>
  );
};

export default CalendarBody;
