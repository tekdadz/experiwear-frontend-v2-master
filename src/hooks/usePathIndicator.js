import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPathTokens } from 'redux/actions/auxiliary';

const usePathIndicator = (paths) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPathTokens(Array.isArray(paths) ? paths : [paths]));
    // eslint-disable-next-line
  }, []);
};

export default usePathIndicator;
