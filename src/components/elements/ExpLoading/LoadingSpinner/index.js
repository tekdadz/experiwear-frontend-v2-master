import { memo } from 'react';
import ReactLottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: require('./trail-loading.json'),
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoadingSpinner = ({ size = 100, ...rest }) => (
  <ReactLottie
    isStopped={false}
    isPaused={false}
    options={defaultOptions}
    style={{ width: size, height: size }}
    {...rest}
  />
);

export default memo(LoadingSpinner);
