import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  menuPaper: {
    backgroundColor: theme.palette.background.primary,
  },
  icon: {
    borderRadius: 6,
    marginRight: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  placeholder: {
    color: theme.palette.text.secondary,
  },
  label: {
    color: '#d5d5dc',
    '&.Mui-focused': {
      color: '#d5d5dc',
    },
  },
}));

const ExpSelect = React.forwardRef(
  ({ items = [], placeholder, label, error, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <FormControl className={classes.root} error={!!error}>
        <InputLabel id={`select-label-${label}`} className={classes.label}>
          {label}
        </InputLabel>
        <Select
          ref={ref}
          labelId={`select-label-${label}`}
          placeholder={placeholder}
          classes={{
            icon: classes.icon,
          }}
          MenuProps={{
            classes: {
              paper: classes.menuPaper,
            },
          }}
          {...rest}
        >
          {(placeholder
            ? items.concat({ value: '', label: placeholder })
            : items
          ).map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
);

export default memo(ExpSelect);
