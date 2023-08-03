import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { ExpLoading } from 'components';
import AppBar from '../AppBar';
import SideMenu from '../SideMenu';
import SideBar from '../SideBar';
import { Box, useMediaQuery } from '@material-ui/core';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '56px 40px 38px 40px',
    marginLeft: theme.custom.layout.sideMenu,
    marginRight: theme.custom.layout.sideBar,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  },
}));

const Layout = ({ children, sidebar, ...boxProps }) => {
  const classes = useStyles();
  const { loadingStatus } = useSelector((state) => state.aux);
  const mobileView = useMediaQuery((theme) =>
    theme.breakpoints.down(MOBILE_BREAKPOINT)
  );
  const [menuToggled, setMenuToggled] = useState(mobileView);

  const handleToggleMenu = () => {
    setMenuToggled(true);
  };

  const handleCloseMenu = () => {
    setMenuToggled(false);
  };

  return (
    <main className={classes.root}>
      <ExpLoading loading={loadingStatus} />
      <SideMenu toggled={menuToggled} onClose={handleCloseMenu} />

      <div className={classes.container}>
        <AppBar onToggleMenu={handleToggleMenu} />
        <Box {...boxProps}>{children}</Box>
      </div>

      <SideBar>{sidebar}</SideBar>
    </main>
  );
};

export default memo(Layout);
