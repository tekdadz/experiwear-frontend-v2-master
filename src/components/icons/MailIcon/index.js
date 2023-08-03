import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const MailIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 15.96'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="m1.986 5.742.725 4.902h10.593l.721-4.974-2.905 2.512-3.123-4.015L4.746 8.17l-2.76-2.427zm8.349-1.278-.065.055.117.012.97 1.247 1.196-1.033.117.011-.052-.068 2.007-1.735a.832.832 0 0 1 1.366.749l-1.247 8.605H1.276L.009 3.741a.832.832 0 0 1 1.372-.747l1.914 1.684-.041.05.09-.007 1.201 1.057 1.008-1.242.091-.008-.05-.043 1.773-2.178a.832.832 0 0 1 1.301.014l1.668 2.143h-.001zM1.34 13.139h13.307v.832c0 .46-.372.832-.832.832H2.172a.832.832 0 0 1-.831-.832v-.832z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(MailIcon);
