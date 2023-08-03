import {
  HomeSidebar,
  Layout,
  Home,
  SelectedGame,
  SelectedGameSidebar,
} from 'components';
import { useEffect, useMemo, useState } from 'react';
import { Box, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from 'redux/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  const [isMonthlyView, setMonthlyView] = useState(true);

  const sidebar = useMemo(
    () => (isMonthlyView ? <HomeSidebar /> : <SelectedGameSidebar />),
    [isMonthlyView]
  );

  const content = useMemo(
    () => (isMonthlyView ? <Home /> : <SelectedGame />),
    [isMonthlyView]
  );

  useEffect(() => {
    dispatch(setSelectedDate(new Date()));
    // eslint-disable-next-line
  }, []);

  const handleChangeView = () => {
    setMonthlyView((view) => !view);
  };

  return (
    <Layout sidebar={sidebar} flexDirection="column">
      <Box display="flex" justifyContent="flex-end" pr={2}>
        <Link component="button" variant="body2" onClick={handleChangeView}>
          {isMonthlyView ? 'Switch to daily' : 'Switch to monthly'}
        </Link>
      </Box>
      {content}
    </Layout>
  );
}
