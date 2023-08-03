import { Box } from '@material-ui/core';
import ScreenFrame from './ScreenFrame';

const ImageScreen = ({ text, imageUrl }) => {
  if (!text || !imageUrl) {
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
        <Box
          height="48px"
          width="48px"
          overflow="hidden"
          borderRadius={6}
          mb={1}
        >
          <img src={imageUrl} width="100%" height="auto" />
        </Box>
        <Box color="white" textAlign="left" fontSize="10px">
          {text}
        </Box>
      </Box>
    </ScreenFrame>
  );
};

export default ImageScreen;
