import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const AlertIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 16'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g transform="translate(0 -1)" fill="none" stroke="none">
        <path
          d="M8 17A8 8 0 1 1 8 1a8 8 0 0 1 0 16zm0-1.6A6.4 6.4 0 1 0 8 2.6a6.4 6.4 0 0 0 0 12.8zM8 5a.8.8 0 0 1 .8.8v4a.8.8 0 1 1-1.6 0v-4A.8.8 0 0 1 8 5zm0 8a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(AlertIcon);
