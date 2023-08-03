import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BellIcon from 'components/icons/BellIcon';
import { useAsyncAction } from 'hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from 'redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  avatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    cursor: 'pointer',
  },
  username: {
    fontFamily: theme.custom.fonts.SFProTextMedium,
    fontSize: 16,
    fontWeight: 500,
    color: '#0f3f62',
    marginLeft: theme.spacing(2),
    letterSpacing: 0.32,
    textTransform: 'capitalize',
  },
  image: {
    backgroundSize: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
    float: 'left',
    marginRight: 10,
  },
  content: {
    color: '#121212',
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 12,
    width: 223,
    height: 42,
    overflowWrap: 'break-word',
    overflow: 'hidden',
  },
  menu: {
    padding: theme.spacing(2, 1.5),
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);
  const latestNotifications = useSelector(
    (state) => state.notifications.all.results
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleNotification = (e) => {
    setAnchorEl(e.currentTarget);
  };

  useAsyncAction(getUserInfo());

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Avatar
          variant="rounded"
          src={currentUser.avatar}
          className={classes.avatar}
        />
        <Typography className={classes.username}>
          {`${currentUser.firstName || ''} ${currentUser.lastName || ''}`}
        </Typography>
      </Box>
      <IconButton onClick={toggleNotification}>
        <Badge variant="dot" color="primary">
          <BellIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ p: 16 }}
        classes={{ paper: classes.menu }}
      >
        {latestNotifications.map((n, idx) => [
          <MenuItem className={classes.item} key={n.id}>
            <img className={classes.image} src={n.imageUrl} />
            <div className={classes.content}>{n.body}</div>
          </MenuItem>,
          idx < latestNotifications.length - 1 && (
            <Divider style={{ margin: 8 }} />
          ),
        ])}
      </Menu>
    </div>
  );
};

export default UserAccount;
