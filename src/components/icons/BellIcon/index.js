import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 18,
  },
}));

const BellIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 18 21'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g
        stroke="#0F3F62"
        strokeWidth="1.5"
        fill="none"
        fillRule="evenodd"
        strokeDasharray="0,0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 17h16M9 3V1M16 10v7h0H2v-7a7 7 0 1 1 14 0zM10.732 17a2 2 0 1 1-3.464 0z" />
      </g>
    </SvgIcon>
  );
};

export default memo(BellIcon);
