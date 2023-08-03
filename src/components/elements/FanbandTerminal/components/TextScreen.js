import { Box } from '@material-ui/core';
import ScreenFrame from './ScreenFrame';

const TextScreen = ({ text }) => {
  if (!text) {
    return <ScreenFrame />;
  }

  return (
    <ScreenFrame>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box color="white" textAlign="left" fontSize="10px">
          {text}
        </Box>
      </Box>
    </ScreenFrame>
  );
};

export default TextScreen;
