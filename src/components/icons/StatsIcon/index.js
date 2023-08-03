import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const StatsIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 16'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="M8 14.4A6.4 6.4 0 1 0 8 1.6a6.4 6.4 0 0 0 0 12.8zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7.2.8h1.6v8H7.2v-8zm0 6.4h8v1.6h-8V7.2z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(StatsIcon);
