import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIcon, IconButton } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 40,
    height: 40,
    backgroundColor: theme.custom.palette.darkGrey,
  },
  svg: {
    width: theme.spacing(2.5),
  },
}));

const EditIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <IconButton
      color="primary"
      aria-label="edit"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SvgIcon viewBox={viewBox || '0 0 20 20'} className={classes.svg}>
        <path
          fill="#F2556F"
          fillRule="evenodd"
          d="M4.269 10.336L14.232.373c.388-.38 1.008-.38 1.395 0l3.985 3.985c.38.387.38 1.008 0 1.395l-9.963 9.963c-.184.188-.434.295-.697.299H4.966c-.55 0-.996-.446-.996-.996v-3.985c.004-.263.111-.514.299-.698zm1.694 3.687h2.58l8.967-8.967-2.58-2.581-8.967 8.967v2.581zm9.963-1.993c0-.55.446-.996.996-.996.551 0 .997.446.997.996v5.978c0 1.1-.892 1.992-1.993 1.992H1.977c-1.1 0-1.992-.892-1.992-1.992V4.059c0-1.096.897-1.992 1.992-1.992h5.978c.551 0 .997.446.997.996s-.446.996-.997.996H1.977v13.949h13.949V12.03z"
        />
      </SvgIcon>
    </IconButton>
  );
};

export default memo(EditIcon);
