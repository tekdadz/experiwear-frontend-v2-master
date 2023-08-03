import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => props.width || 73,
    height: (props) => props.height || 75,
  },
}));

const CloudIcon = ({ className, viewBox, width, height, ...rest }) => {
  const classes = useStyles({ width, height });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 73 75'}
      {...rest}
      className={clsx(classes.root, className)}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h73v75H0z" />
        <path
          d="M58.856 31.375C56.788 20.594 47.572 12.5 36.5 12.5c-8.79 0-16.425 5.125-20.227 12.625C7.118 26.125 0 34.094 0 43.75 0 54.094 8.182 62.5 18.25 62.5h39.542C66.187 62.5 73 55.5 73 46.875c0-8.25-6.235-14.938-14.144-15.5zm-16.273 9.25v12.5H30.417v-12.5h-9.125L36.5 25l15.208 15.625h-9.125z"
          fill="currentColor"
          fillRule="nonzero"
        />
      </g>
    </SvgIcon>
  );
};

export default memo(CloudIcon);
