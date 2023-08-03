import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 14,
  },
}));

const LogoutIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 18'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g
        transform="translate(-4 -3)"
        fill="none"
        fillRule="evenodd"
        strokeDasharray="0,0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M11 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M8 12h11M15 8l4 4-4 4" />
        </g>
      </g>
    </SvgIcon>
  );
};

export default memo(LogoutIcon);
