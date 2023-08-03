import { Box, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { ALERT_PROTO_TYPES } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: ({ minimized }) => ({
    width: minimized ? 54 : theme.spacing(12),
    height: minimized ? 52 : theme.spacing(12),
  }),
  button: ({ minimized }) => ({
    width: minimized ? 32 : 53,
    height: minimized ? 32 : 53,
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: minimized ? 14 : 20,
    fontWeight: 500,
    color: '#333',
    textAlign: 'center',
    borderRadius: '38%',
  }),
  selected: {
    backgroundColor: theme.palette.info.main,
    color: '#fff !important',
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
  infoSection: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  infoBox: ({ minimized }) => ({
    width: 0,
    height: minimized ? 4 : 7,
    borderRadius: '50%',
    background: 'none',
  }),
  infoBoxActive: ({ minimized }) => ({
    width: minimized ? 4 : 7,
    margin: '0 2px',
  }),
  ...Object.values(ALERT_PROTO_TYPES).reduce(
    (acc, type) => ({
      ...acc,
      [type]: {
        backgroundColor: `${theme.palette[type].main} !important`,
      },
    }),
    {}
  ),
}));

const CalendarCell = ({ day, selected, data = {}, onSelect, minimized }) => {
  const classes = useStyles({ minimized });

  const handleClick = () => {
    onSelect(day);
  };

  return (
    <td className={classes.root}>
      {day && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="column"
          width="100%"
          height="80%"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <IconButton
              className={clsx(classes.button, { [classes.selected]: selected })}
              onClick={handleClick}
            >
              {day}
            </IconButton>
          </Box>
          <Box className={classes.infoSection}>
            {Object.values(ALERT_PROTO_TYPES).map((type) => (
              <Box
                key={type}
                className={clsx(classes.infoBox, {
                  [classes[type]]: data[type],
                  [classes.infoBoxActive]: data[type],
                })}
              />
            ))}
          </Box>
        </Box>
      )}
    </td>
  );
};

export default CalendarCell;
