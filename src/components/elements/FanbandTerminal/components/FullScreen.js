import { makeStyles, Box } from '@material-ui/core';
import {
  TERMINAL_ATL,
  TERMINAL_HAWKS,
  TERMINAL_HAWKS_LOGO,
} from 'utils/constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '10%',
    clipPath: `url(#clip-path)`,
    overflow: 'hidden',
    background: (props) => `url(${props.imageUrl || '#'})`,
    backgroundSize: 'cover !important',
  },
  hawksIcon: {
    height: '30%',
    marginBottom: '15%',
  },
});

const FullScreen = ({ imageUrl }) => {
  const classes = useStyles({ imageUrl });

  return (
    <div className={classes.root}>
      {imageUrl ? null : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            mt="30%"
            height="40%"
          >
            <img src={TERMINAL_ATL} width="100%" />
            <img src={TERMINAL_HAWKS} width="100%" />
          </Box>
          <img src={TERMINAL_HAWKS_LOGO} className={classes.hawksIcon} />
        </>
      )}
    </div>
  );
};

export default FullScreen;
