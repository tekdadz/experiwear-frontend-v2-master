import React from 'react';
import { TextField } from '@material-ui/core';

const ExpTextField = React.forwardRef(({ error, ...rest }, ref) => (
  <TextField inputRef={ref} error={!!error} helperText={error} {...rest} />
));

export default ExpTextField;
