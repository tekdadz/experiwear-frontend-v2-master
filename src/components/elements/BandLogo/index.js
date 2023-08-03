import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { BAND_LOGO_IMAGE_PATH, HAWKS_URL } from 'utils/constants';

const useStyles = makeStyles({
  picture: {
    display: 'flex',
  },
  img: (props) => ({
    width: '100%',
    maxWidth: props.width,
    objectFit: 'contain',
  }),
});

const BandLogo = ({ width = 489, className, ...rest }) => {
  const classes = useStyles({ width });

  return (
    <a aria-label="logo" href={HAWKS_URL} target="_blank" rel="noreferrer">
      <picture className={clsx(classes.picture, className)} {...rest}>
        <source srcSet={BAND_LOGO_IMAGE_PATH} />
        <img
          className={classes.img}
          src={BAND_LOGO_IMAGE_PATH}
          alt="band-logo"
        />
      </picture>
    </a>
  );
};

export default memo(BandLogo);
