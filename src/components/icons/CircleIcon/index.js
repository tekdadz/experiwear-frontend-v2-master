import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const CircleIcon = ({ className, color, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 16'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g stroke="none" fill={color || 'currentColor'}>
        <circle id="Oval" cx="8" cy="8" r="8" />
      </g>
    </SvgIcon>
  );
};

export default memo(CircleIcon);
