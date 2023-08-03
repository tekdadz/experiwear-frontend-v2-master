import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from 'redux/actions';

const useAsyncAction = (action, showLoading = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (showLoading) {
      (async () => {
        dispatch(setLoadingStatus(true));
        await dispatch(action);
        dispatch(setLoadingStatus(false));
      })();
    }
    // eslint-disable-next-line
  }, []);
};

export default useAsyncAction;
