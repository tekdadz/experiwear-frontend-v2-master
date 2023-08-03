import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: 16,
  },
}));

const CalendarIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 14.4'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" stroke="none">
        <path
          d="M7.2 2.6v-.8a.8.8 0 1 1 1.6 0v.8h2.4v-.8a.8.8 0 1 1 1.6 0v.8h.8A2.4 2.4 0 0 1 16 5v8a2.4 2.4 0 0 1-2.4 2.4H2.4A2.4 2.4 0 0 1 0 13V5a2.4 2.4 0 0 1 2.4-2.4h.8v-.8a.8.8 0 1 1 1.6 0v.8h2.4zm0 1.6H4.8V5a.8.8 0 1 1-1.6 0v-.8h-.8a.8.8 0 0 0-.8.8v8a.8.8 0 0 0 .8.8h11.2a.8.8 0 0 0 .8-.8V5a.8.8 0 0 0-.8-.8h-.8V5a.8.8 0 1 1-1.6 0v-.8H8.8V5a.8.8 0 1 1-1.6 0v-.8zM2.4 7.4H4V9H2.4V7.4zm0 3.2H4v1.6H2.4v-1.6zm9.6 0h1.6v1.6H12v-1.6zm0-3.2h1.6V9H12V7.4zm-6.4 0h1.6V9H5.6V7.4zm3.2 0h1.6V9H8.8V7.4zm0 3.2h1.6v1.6H8.8v-1.6zm-3.2 0h1.6v1.6H5.6v-1.6z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(CalendarIcon);
