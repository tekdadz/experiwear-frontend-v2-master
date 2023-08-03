import { Box } from '@material-ui/core';
import ScreenFrame from './ScreenFrame';

const QuickPollScreen = ({ responses = [], text }) => {
  if (!text || responses.every((d) => !d)) {
    return <ScreenFrame />;
  }

  return (
    <ScreenFrame>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box color="#f80015" fontSize="16px" mb={2}>
          POLL
        </Box>
        <Box color="white" textAlign="left" fontSize="10px" mb={2.5}>
          {text}
        </Box>
        {responses
          .filter((r) => r)
          .map((res, idx) => (
            <Box
              key={idx}
              color={idx ? 'white' : '#ffdb3c'}
              textAlign="center"
              fontSize="10px"
              mb="5px"
              pl={idx ? '6px' : 0}
            >
              {idx ? null : (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    display: 'inline-block',
                    borderTop: '3px solid transparent',
                    borderLeft: '6px solid #ffdb3c',
                    borderBottom: '3px solid transparent',
                    marginRight: 3,
                  }}
                />
              )}
              <span style={{ textTransform: 'uppercase' }}>{res}</span>
            </Box>
          ))}
      </Box>
    </ScreenFrame>
  );
};

export default QuickPollScreen;
