import React, { memo } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    color: theme.custom.palette.red,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const LinkButton = ({
  href,
  as,
  target = '',
  onClick = () => {},
  className,
  children,
}) => {
  const classes = useStyles();

  return href ? (
    <Link href={href} as={as}>
      <a className={clsx(classes.root, className)} target={target}>
        {children}
      </a>
    </Link>
  ) : (
    <Typography className={clsx(classes.root, className)} onClick={onClick}>
      {children}
    </Typography>
  );
};

export default memo(LinkButton);
