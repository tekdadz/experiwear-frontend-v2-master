import { Box, Button, alpha, makeStyles } from '@material-ui/core';
import { ColorPicker } from 'material-ui-color';
import { useCallback, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    '&>div': {
      top: '4px',
      left: 'calc(50% - 18px)',
      position: 'absolute',
      visibility: 'hidden',
    },
  },
  button: ({ color }) => ({
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    borderRadius: 5,
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    lineHeight: 1.15,
    height: 35,
    '&:hover': {
      backgroundColor: alpha(color, 0.6),
    },
  }),
}));

const ColorField = ({
  label,
  name = 'color_field',
  value = 'rgb(255,255,255)',
  onChange,
}) => {
  const classes = useStyles({ color: value });
  const [pickerToggled, togglePicker] = useState(false);
  const [errValue, setErrValue] = useState();
  const handleTogglePicker = useCallback(() => togglePicker(true), []);
  const handleColorChange = useCallback(
    (val) => {
      const isInvalidHex =
        typeof val.raw === 'string' && !/^\#[0-9a-fA-F]{6}$/.test(val.raw);
      if (isInvalidHex) {
        setErrValue(val.raw);

        if (/^\#[0-9a-fA-F]{3}$/.test(val.raw)) {
          onChange({
            target: {
              name,
              value: `rgb(${val.rgb.map((v) => v || 0).toString()})`,
            },
          });
        }
      } else {
        onChange({
          target: {
            name,
            value: `rgb(${val.rgb.map((v) => v || 0).toString()})`,
          },
        });
        setErrValue(null);
      }
    },
    [name, onChange]
  );
  const handleClosePicker = useCallback((open) => togglePicker(open), []);
  return (
    <Box className={classes.root}>
      <Button onClick={handleTogglePicker} className={classes.button}>
        {label}
      </Button>
      {pickerToggled && (
        <ColorPicker
          openAtStart
          disableAlpha
          hideTextfield
          value={errValue || value}
          onChange={handleColorChange}
          onOpen={handleClosePicker}
        />
      )}
    </Box>
  );
};

export default ColorField;
