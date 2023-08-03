import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  header: {
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 14,
    color: '#333',
    padding: theme.spacing(1, 3.5),
  },
  menuIcon: {
    minWidth: 35,
    color: '#9ea3ba',
  },
  menuIconActive: {
    color: '#01a1c3',
  },
  item: {
    fontFamily: theme.custom.fonts.SFProTextRegular,
    fontSize: 14,
    color: '#000',
    paddingLeft: theme.spacing(4),
    paddingTop: 4,
    paddingBottom: 4,
  },
  selectedItem: {
    '& .MuiTypography-root': {
      fontFamily: theme.custom.fonts.SFProTextMedium,
    },
    backgroundColor: '#f7fafc',
  },
}));

const SubMenu = ({ title, items }) => {
  const classes = useStyles();
  const mainPath = useSelector((state) => state.aux.pathTokens?.[1]?.path);
  const router = useRouter();

  const handleItemClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <List subheader={<div className={classes.header}>{title}</div>}>
      {items.map(({ title, path, icon: MenuIcon }, idx) => (
        <ListItem
          key={idx}
          button
          className={clsx(classes.item, {
            [classes.selectedItem]: path === mainPath,
          })}
          onClick={(e) => handleItemClick(e, path)}
        >
          <ListItemIcon
            className={clsx(classes.menuIcon, {
              [classes.menuIconActive]: path === mainPath,
            })}
          >
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </List>
  );
};

export default memo(SubMenu);
