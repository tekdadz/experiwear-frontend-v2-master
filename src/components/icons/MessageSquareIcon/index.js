import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const MessageSquareIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 14.4 16'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="M4.815 14.362c2.143-1.97 2.406-2.125 3.035-2.188 2.841-.282 4.95-2.366 4.95-4.77 0-2.609-2.468-4.803-5.6-4.803-3.132 0-5.6 2.195-5.6 4.802 0 1.515.94 3.014 2.443 3.966.627.396.767.893.753 1.422-.001.04-.004.08-.007.12.017.264.025.736.026 1.452v-.001zm3.192-.595c-.148.015-1.3 1.021-3.456 3.02a.8.8 0 0 1-1.344-.594c.016-1.89.009-2.967-.019-3.232-.014-.139.026-.224 0-.24C1.366 11.57 0 9.62 0 7.404 0 3.867 3.224 1 7.2 1s7.2 2.867 7.2 6.403c0 3.294-2.796 6.007-6.392 6.364z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(MessageSquareIcon);
