import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LOGO_IMAGE_PATH, EXPERIWEAR_URL } from 'utils/constants';

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
    justifyContent: 'center',
  },
  img: (props) => ({
    width: props.width,
    objectFit: 'contain',
  }),
}));

const Logo = ({ width = 137, className, ...rest }) => {
  const classes = useStyles({ width });

  return (
    <a aria-label="logo" href={EXPERIWEAR_URL} target="_blank" rel="noreferrer">
      <picture className={clsx(classes.picture, className)} {...rest}>
        <source srcSet={LOGO_IMAGE_PATH} />
        <img className={classes.img} src={LOGO_IMAGE_PATH} alt="logo" />
      </picture>
    </a>
  );
};

export default memo(Logo);
