import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';
import { formatPhone, isEmpty } from 'utils/helpers';

const PhonePicker = ({
  error,
  label,
  value,
  placeholder,
  onChange,
  fullWidth,
  ...boxProps
}) => {
  const phones = useSelector((state) =>
    state.main.fanbands.results
      .filter((f) => f.phone)
      .map((f) => formatPhone(f.phone))
  );

  useAsyncAction(getFanbands(), !phones.length);

  return (
    <Box {...boxProps}>
      <Autocomplete
        multiple
        fullWidth={fullWidth}
        options={phones}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={error}
            error={!!error}
            variant="standard"
            label={label}
            placeholder={isEmpty(value) ? placeholder : ''}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Box>
  );
};

export default PhonePicker;
