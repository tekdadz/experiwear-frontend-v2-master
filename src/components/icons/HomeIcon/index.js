import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const HomeIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 16'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="M 14.4 14.373 V 5.532 L 8 1.627 L 1.6 5.532 V 14.373 H 4.8 V 12.136 C 4.8 10.339 6.233 8.882 8 8.882 C 9.767 8.882 11.2 10.339 11.2 12.136 V 14.373 H 14.4 Z M 9.6 16 V 12.136 C 9.6 11.237 8.884 10.509 8 10.509 C 7.116 10.509 6.4 11.237 6.4 12.136 V 16 H 1.6 C 0.716 16 0 15.272 0 14.373 V 5.532 C 0 4.96 0.295 4.431 0.777 4.137 L 7.177 0.232 C 7.683 -0.078 8.317 -0.078 8.823 0.232 L 15.223 4.137 C 15.705 4.431 16 4.96 16 5.532 V 14.373 C 16 15.272 15.284 16 14.4 16 H 9.6 Z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(HomeIcon);
