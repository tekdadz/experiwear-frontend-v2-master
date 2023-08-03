import React, { useMemo, useState } from 'react';
import {
  TextField,
  InputAdornment,
  Popover,
  Tabs,
  Tab,
  MenuList,
  MenuItem,
  makeStyles,
  InputBase,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TabContext, TabPanel } from '@material-ui/lab';
import { useAsyncAction } from 'hooks';
import { getFanbands } from 'redux/actions';
import { useSelector } from 'react-redux';
import { FANBAND_LABELS, FANBAND_TYPES } from 'utils/constants';

const useStyles = makeStyles((theme) => ({
  item: {
    fontFamily: theme.custom.fonts.SFProTextBold,
    fontSize: 14,
    paddingLeft: 0,
    color: '#000',
    '&>span': {
      fontFamily: theme.custom.fonts.SFProTextRegular,
    },
  },
  hidden: {
    display: 'none',
  },
  tabPanel: {
    paddingTop: 0,
  },
}));

const FanbandTabPanel = ({ value, fanbands = [], onClick }) => {
  const classes = useStyles();
  return (
    <MenuList>
      {fanbands.map(({ id, name, phone }) => (
        <MenuItem
          key={id}
          className={classes.item}
          onClick={() => onClick(id)}
          selected={id === value}
        >
          {name}
          <span>&nbsp;{` ∙ Phone: ${phone}`}</span>
        </MenuItem>
      ))}
    </MenuList>
  );
};

const FanbandSelector = React.forwardRef(
  ({ error, label, value, ...rest }, ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [tab, setTab] = useState(FANBAND_TYPES.provisioned);
    const [search, setSearch] = useState();

    const fanbands = useSelector((state) => state.main.fanbands.results);

    const fanbandLabel = useMemo(() => {
      const { name, phone } = fanbands.find((f) => f.id === value) || {};
      return `${name || ''} ∙ Phone: ${phone || ''}`;
    }, [fanbands, value]);

    const provisionedFanbands = useMemo(
      () =>
        fanbands.filter(
          (f) => f.phone && (!search || f.phone.includes(search))
        ),
      [fanbands, search]
    );

    const nonProvisionedFanbands = useMemo(
      () => fanbands.filter((f) => !f.phone),
      [fanbands]
    );

    const handleClick = (id) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(ref.current, id);
      const ev1 = new Event('input', { bubbles: true });
      ref.current.dispatchEvent(ev1);
      setAnchorEl(null);
    };

    useAsyncAction(getFanbands(), !fanbands.length);

    return (
      <React.Fragment>
        <TextField
          label={label}
          helperText={error}
          error={!!error}
          value={value && fanbandLabel}
          placeholder="Not assigned"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <KeyboardArrowDownIcon />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          InputLabelProps={{ shrink: true }}
          onClick={(e) => setAnchorEl(e.target)}
        />
        <TextField
          inputRef={ref}
          {...rest}
          value={value}
          className={classes.hidden}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab
              value={FANBAND_TYPES.provisioned}
              label={FANBAND_LABELS.provisioned}
            />
            <Tab
              value={FANBAND_TYPES.nonProvisioned}
              label={FANBAND_LABELS.nonProvisioned}
            />
            <Tab value={FANBAND_TYPES.all} label={FANBAND_LABELS.all} />
          </Tabs>
          <TabContext value={tab}>
            <TabPanel
              value={FANBAND_TYPES.provisioned}
              className={classes.tabPanel}
            >
              <InputBase
                placeholder="Search by phone number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FanbandTabPanel
                fanbands={provisionedFanbands}
                onClick={handleClick}
                value={value}
              />
            </TabPanel>
            <TabPanel
              value={FANBAND_TYPES.nonProvisioned}
              className={classes.tabPanel}
            >
              <FanbandTabPanel
                fanbands={nonProvisionedFanbands}
                onClick={handleClick}
                value={value}
              />
            </TabPanel>
            <TabPanel value={FANBAND_TYPES.all} className={classes.tabPanel}>
              <FanbandTabPanel
                fanbands={fanbands}
                onClick={handleClick}
                value={value}
              />
            </TabPanel>
          </TabContext>
        </Popover>
      </React.Fragment>
    );
  }
);

export default FanbandSelector;
