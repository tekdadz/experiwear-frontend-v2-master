import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => props.width || 12,
    marginLeft: 2,
    marginRight: 2,
  },
}));

const TicketIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles(rest);

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 12 20'}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <path
        d="M10 9H8a1 1 0 1 1 0-2h2V2.001a4.999 4.999 0 0 1-8 0V7h2a1 1 0 1 1 0 2H2v8.999a4.999 4.999 0 0 1 8 0V9zM0 20V0h3.17a3.001 3.001 0 0 0 5.66 0H12v20H8.83a3.001 3.001 0 0 0-5.66 0H0z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </SvgIcon>
  );
};

export default memo(TicketIcon);
