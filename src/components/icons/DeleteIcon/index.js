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

const DeleteIcon = ({ className, viewBox, ...rest }) => {
  const classes = useStyles();

  return (
    <IconButton
      color="primary"
      aria-label="delete"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <SvgIcon viewBox={viewBox || '0 0 20 20'} className={classes.svg}>
        <path
          fill="#F2556F"
          fillRule="evenodd"
          d="M6 4V2c0-1.1.9-2 2-2h4c1.105 0 2 .895 2 2v2h5c.552 0 1 .448 1 1s-.448 1-1 1h-1v12c0 1.104-.895 2-2 2H4c-1.105 0-2-.896-2-2V6H1c-.552 0-1-.448-1-1s.448-1 1-1h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1s-1-.448-1-1V9c0-.552.448-1 1-1zm4 0c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1s-1-.448-1-1V9c0-.552.448-1 1-1z"
        />
      </SvgIcon>
    </IconButton>
  );
};

export default memo(DeleteIcon);
