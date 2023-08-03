import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const AccelerometerIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 14.55'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="M9.532 7.546h2.874c.398 0 .719.325.719.727a.723.723 0 0 1-.719.727H8.813a.723.723 0 0 1-.719-.727V3.909c0-.401.322-.727.719-.727.397 0 .719.326.719.727v3.637zm4.363-4.416A7.294 7.294 0 0 1 16 8.273c0 4.017-3.218 7.273-7.187 7.273V14.09c3.175 0 5.75-2.605 5.75-5.818a5.833 5.833 0 0 0-1.685-4.114 5.698 5.698 0 0 0-4.065-1.704c-2.578 0-4.76 1.716-5.489 4.081l.983-.671a.713.713 0 0 1 .998.196.732.732 0 0 1-.194 1.01L2.728 8.698A.713.713 0 0 1 1.73 8.5L.123 6.09a.732.732 0 0 1 .195-1.01.713.713 0 0 1 .997.196l.61.915C2.81 3.19 5.559 1 8.814 1c1.985 0 3.782.815 5.082 2.13z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(AccelerometerIcon);
