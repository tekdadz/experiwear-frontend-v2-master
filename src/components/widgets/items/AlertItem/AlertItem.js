import {
  Box,
  Button,
  Link,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSavedAlert, sendSavedAlert } from 'redux/actions';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    textAlign: 'left',
    textTransform: 'none',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: theme.spacing(1.5),
    objectFit: 'cover',
    width: 46,
    height: 46,
    borderRadius: 6,
  },
  title: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    color: '#333',
    textTransform: 'capitalize',
  },
  link: {
    fontFamily: theme.custom.fonts.SFUITextMedium,
    fontSize: 14,
    textTransform: 'capitalize',
    cursor: 'pointer',
  },
  description: {
    fontSize: 12,
    color: '#333',
  },
  popover: {
    marginTop: 15,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 11,
    padding: '20px 14px',
  },
  actions: {
    backgroundColor: '#9ea3ba',
    '&:hover': {
      backgroundColor: '#9ea3ba',
    },
    maxWidth: 86,
    height: 35,
    fontSize: 12,
  },
  action: {
    width: 120,
    height: 35,
    fontSize: 12,
  },
  send: {
    backgroundColor: theme.palette.alert.main,
    '&:hover': {
      backgroundColor: theme.palette.alert.dark,
    },
  },
  edit: {
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  delete: {
    backgroundColor: theme.palette.danger.main,
    '&:hover': {
      backgroundColor: theme.palette.danger.dark,
    },
  },
}));

const AlertItem = ({
  data: {
    id,
    imageUrl,
    imageIndex,
    type,
    title,
    createdAt,
    scheduledTime = null,
  },
  action = false,
  href = '',
  className,
  ...boxProps
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { gamedayPresets } = useSelector((state) => state.notifications);

  const imageLink = useMemo(() => {
    if (type === ALERT_PROTO_TYPES.gameday) {
      return gamedayPresets?.[imageIndex] || imageUrl;
    }
    return imageUrl;
  }, [imageUrl, gamedayPresets, imageIndex, type]);

  const hanldeOpenActions = (e) => setAnchorEl(e.target);
  const handleCloseActions = () => setAnchorEl(null);

  const handleSend = () => {
    setAnchorEl(null);
    dispatch(sendSavedAlert(id));
  };

  const handleEdit = () => {
    setAnchorEl(null);
    router.push(LINKS.savedEdit.path.replace(':id', id));
  };

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(removeSavedAlert(id));
  };

  const handleClickLink = () => {
    href && router.push(href.replace(':id', id));
  };

  return (
    <Box {...boxProps} className={clsx(classes.root, className)}>
      <Box display="flex" alignItems="center">
        <img className={classes.icon} src={imageLink} />
        <div>
          {href ? (
            <Link onClick={handleClickLink} className={classes.link}>
              {`${type} alert`}
            </Link>
          ) : (
            <Typography className={classes.title}>{`${type} alert`}</Typography>
          )}
          <Typography className={classes.description}>{title}</Typography>
          <Typography className={classes.description}>
            {moment(scheduledTime || createdAt).format('MMM D @ hh:mm A')}
          </Typography>
        </div>
      </Box>
      {action && (
        <Button className={classes.actions} onClick={hanldeOpenActions}>
          Actions
        </Button>
      )}
      <Popover
        onClose={handleCloseActions}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
        classes={{ paper: classes.popover }}
      >
        <div className={classes.actionsContainer}>
          <Button
            className={clsx(classes.action, classes.send)}
            onClick={handleSend}
          >
            Send
          </Button>
          <Button
            className={clsx(classes.action, classes.edit)}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            className={clsx(classes.action, classes.delete)}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Popover>
    </Box>
  );
};

export default AlertItem;
