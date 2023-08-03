import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => props.width || 26,
  },
}));

const UserIcon = ({ className, viewBox, width, ...rest }) => {
  const classes = useStyles({ width });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 26 26'}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <defs>
        <filter id="9zewotohga">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 0.003922 0 0 0 0 0.631373 0 0 0 0 0.764706 0 0 0 1.000000 0"
          />
        </filter>
      </defs>
      <g
        transform="translate(-19 -14)"
        filter="url(#9zewotohga)"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M32 40c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zm0-2.6c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4-5.744 0-10.4 4.656-10.4 10.4 0 5.744 4.656 10.4 10.4 10.4zm0-18.2a5.2 5.2 0 0 1 5.2 5.2V27a5.2 5.2 0 1 1-10.4 0v-2.6a5.2 5.2 0 0 1 5.2-5.2zm0 2.6a2.6 2.6 0 0 0-2.6 2.6V27a2.6 2.6 0 0 0 5.2 0v-2.6a2.6 2.6 0 0 0-2.6-2.6zm-5.317 14.139a10.443 10.443 0 0 1-2.054-1.602 7.241 7.241 0 0 1 2.865-2.046 1.3 1.3 0 1 1 .953 2.418c-.692.273-1.29.7-1.765 1.23h.001zm10.587.028a4.748 4.748 0 0 0-1.833-1.253 1.3 1.3 0 1 1 .926-2.428 7.345 7.345 0 0 1 2.969 2.089c-.618.615-1.31 1.15-2.062 1.592z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(UserIcon);
