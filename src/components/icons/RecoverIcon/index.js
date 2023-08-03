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

const RecoverIcon = ({ className, viewBox, ...rest }) => {
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
          d="M17 20H3c-1.654 0-3-1.346-3-3V3c0-1.654 1.346-3 3-3h5c.552 0 1 .448 1 1s-.448 1-1 1H3c-.551 0-1 .449-1 1v14c0 .551.449 1 1 1h14c.551 0 1-.449 1-1v-5c0-.552.448-1 1-1s1 .448 1 1v5c0 1.654-1.346 3-3 3zm2-11c-.552 0-1-.448-1-1V3.414l-7.293 7.293c-.391.391-1.023.391-1.414 0s-.391-1.023 0-1.414L16.586 2H12c-.552 0-1-.448-1-1s.448-1 1-1h7c.129 0 .259.025.383.076l.003.002c.008.003.014.01.023.014.1.045.188.107.266.179.026.024.046.05.069.077.056.063.102.132.14.208.017.032.033.061.046.095.041.11.07.226.07.349v7c0 .552-.448 1-1 1z"
        />
      </SvgIcon>
    </IconButton>
  );
};

export default memo(RecoverIcon);
