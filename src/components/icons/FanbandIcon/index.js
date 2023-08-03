import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => props.width || 48,
  },
}));

const FanbandIcon = ({ className, viewBox, width, ...rest }) => {
  const classes = useStyles({ width });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 48 48'}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <path
        d="m46.847 7.53-6.378-6.377a3.949 3.949 0 0 0-5.577 0l-4.71 4.71a10.229 10.229 0 0 0-5.521 2.862L8.717 24.666a10.274 10.274 0 0 0-2.868 5.525l-4.705 4.705c-1.525 1.462-1.525 4.114 0 5.576L7.52 46.85A3.917 3.917 0 0 0 10.311 48a3.917 3.917 0 0 0 2.788-1.151l4.71-4.71a10.23 10.23 0 0 0 5.52-2.862l15.944-15.942a10.226 10.226 0 0 0 2.864-5.52l4.71-4.709a3.947 3.947 0 0 0 0-5.576zM11.773 45.523c-.764.797-2.161.798-2.926 0L2.47 39.146a2.052 2.052 0 0 1-.602-1.462c0-.555.213-1.074.602-1.463l3.272-3.271c.318 4.702 4.51 8.98 9.308 9.296l-3.277 3.277zM37.947 22.01 22.004 37.95c-3.13 3.265-8.831 3.267-11.96 0-3.298-3.296-3.298-8.66 0-11.958l15.943-15.94c3.297-3.298 8.663-3.298 11.96 0 3.266 3.128 3.266 8.828 0 11.958zm7.574-10.23-3.277 3.277c-.36-4.814-4.488-8.943-9.303-9.302l3.277-3.276a2.071 2.071 0 0 1 2.925 0l6.378 6.377a2.07 2.07 0 0 1 0 2.925z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </SvgIcon>
  );
};

export default memo(FanbandIcon);
