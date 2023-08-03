import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Drawer, useMediaQuery } from '@material-ui/core';

import { SubMenu } from './components';
import { SIDEBAR_GROUPS } from './constants';
import { Logo, LogoutIcon } from 'components';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'redux/actions/auth';
import { useRouter } from 'next/router';
import { LINKS } from 'utils/constants';
import { MOBILE_BREAKPOINT } from 'utils/constants/theme';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      visible: 'visible',
    },
    width: theme.custom.layout.sideMenu,
    flexShrink: 0,
  },
  paper: {
    width: theme.custom.layout.sideMenu,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.17)',
    paddingTop: theme.spacing(7),
    border: 'none !important',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    justifyContent: 'flex-start',
    '& .MuiButton-startIcon': {
      marginRight: 20,
    },
  },
}));

const SideMenu = ({ toggled = false, onClose }) => {
  const router = useRouter();
  const classes = useStyles();
  const mobileView = useMediaQuery((theme) =>
    theme.breakpoints.down(MOBILE_BREAKPOINT)
  );
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push(LINKS.signIn.path);
  };

  return (
    <Drawer
      open={!mobileView || toggled}
      anchor="left"
      variant={toggled ? 'temporary' : 'persistent'}
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        mb={2}
      >
        <Logo />
        {toggled && (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Box>
        {SIDEBAR_GROUPS.map(({ title, items }) => (
          <SubMenu key={title} title={title} items={items} />
        ))}
      </Box>
      <Button
        startIcon={<LogoutIcon />}
        className={classes.logoutButton}
        onClick={handleLogout}
        variant="text"
        color="default"
      >
        Log out
      </Button>
    </Drawer>
  );
};

export default memo(SideMenu);
