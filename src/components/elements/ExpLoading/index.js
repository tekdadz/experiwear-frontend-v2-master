import { memo } from 'react';
import { Backdrop } from '@material-ui/core';
import LoadingSpinner from './LoadingSpinner';

const ExpLoading = ({ loading, size }) => {
  return (
    <Backdrop open={loading} style={{ zIndex: 9999 }}>
      <LoadingSpinner size={size} />
    </Backdrop>
  );
};

export default memo(ExpLoading);
