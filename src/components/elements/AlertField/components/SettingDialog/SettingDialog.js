import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  RadioGroup,
} from '@material-ui/core';
import {
  ColorField,
  FormButton,
  HeaderText,
  SubHeaderText,
  PrettoSlider,
  Title,
  FanbandTerminal,
  ExpRadio,
} from 'components';
import { VIBRATION_MARKS } from './constants';
import CloseIcon from '@material-ui/icons/Close';
import { LED_TYPES, VIB_INTENSITIES, VIB_TYPES } from 'utils/constants';
import clsx from 'clsx';
import { PRESET_PATTERNS } from 'utils/constants/enums';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
  },
  presetPanel: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  presetButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    marginLeft: 8,
    marginBottom: 8,
    color: '#c8c8c8',
    fontSize: 14,
    fontFamily: theme.custom.fonts.SFUITextMedium,
    border: 'solid 1px #c8c8c8',
    borderRadius: 12,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.grey,
      border: 'solid 2px #a2a2a2',
      color: '#a2a2a2',
    },
  },
  presetSelected: {
    background: theme.palette.primary.main,
    color: 'white !important',
    border: 'none !important',
  },
}));

const SettingDialog = ({
  open,
  onClose,
  params,
  terminalScreen,
  onChange,
  onReset,
  onSaveAsDefault,
}) => {
  const classes = useStyles();

  const handleDurationChange = useCallback(
    (e, value) => {
      onChange({ target: { value, name: 'duration', type: 'slider' } });
    },
    [onChange]
  );

  const handleSelectPreset = useCallback(
    (presetIdx) => {
      onReset(PRESET_PATTERNS[presetIdx]);
    },
    [onReset]
  );

  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      onReset(PRESET_PATTERNS[0]);
    },
    [onReset]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      classes={{ paper: classes.root }}
    >
      <DialogTitle>
        <Title>Alert Parameters</Title>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item lg={9} xs={12}>
            <HeaderText>IOS PRESETS</HeaderText>
            <div className={classes.presetPanel}>
              {PRESET_PATTERNS.map(({ presetPatternIndex: idx }) => (
                <div
                  key={idx}
                  className={clsx(classes.presetButton, {
                    [classes.presetSelected]: params.presetPatternIndex === idx,
                  })}
                  onClick={() => handleSelectPreset(idx)}
                >
                  {idx}
                </div>
              ))}
            </div>
            <SubHeaderText>Duration</SubHeaderText>
            <Grid container spacing={2}>
              <Grid item lg={8} xs={12}>
                <PrettoSlider
                  name="duration"
                  valueLabelDisplay="on"
                  min={1}
                  max={20}
                  step={1}
                  valueLabelFormat={(value) => `${value}s`}
                  marks={VIBRATION_MARKS}
                  value={params.duration}
                  onChange={handleDurationChange}
                />
              </Grid>
            </Grid>

            <HeaderText>Led Lights</HeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="ledType"
                value={params.ledType}
                onChange={onChange}
              >
                <ExpRadio
                  label="Flashing"
                  color="info"
                  value={LED_TYPES.flashing}
                />
                <ExpRadio
                  label="Stable"
                  color="info"
                  value={LED_TYPES.stable}
                />
              </RadioGroup>
            </Box>
            <SubHeaderText>Color palette</SubHeaderText>
            <Grid container spacing={2}>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="topColor1"
                  label="Top light #1"
                  value={params.topColor1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="topColor2"
                  label="Top light #2"
                  value={params.topColor2}
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="topColor3"
                  label="Top light #3"
                  value={params.topColor3}
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="bottomColor1"
                  label="Bottom light #1"
                  value={params.bottomColor1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="bottomColor2"
                  label="Bottom light #2"
                  value={params.bottomColor2}
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={4} xs={6}>
                <ColorField
                  name="bottomColor3"
                  label="Bottom light #3"
                  value={params.bottomColor3}
                  onChange={onChange}
                />
              </Grid>
            </Grid>

            <HeaderText>Vibration</HeaderText>

            <SubHeaderText>Intensity</SubHeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="vibrationIntensity"
                value={params.vibrationIntensity}
                onChange={onChange}
              >
                <ExpRadio
                  label="No Vibration"
                  color="info"
                  value={VIB_INTENSITIES.no}
                />
                <ExpRadio
                  label="Low"
                  color="info"
                  value={VIB_INTENSITIES.low}
                />
                <ExpRadio
                  label="Medium"
                  color="info"
                  value={VIB_INTENSITIES.medium}
                />
                <ExpRadio
                  label="High"
                  color="info"
                  value={VIB_INTENSITIES.high}
                />
              </RadioGroup>
            </Box>

            <SubHeaderText>Style</SubHeaderText>
            <Box mb={2}>
              <RadioGroup
                row
                name="vibrationType"
                value={params.vibrationType}
                onChange={onChange}
              >
                <ExpRadio
                  label="Quick bursts"
                  color="info"
                  value={VIB_TYPES.quickBursts}
                />
                <ExpRadio
                  label="Long vibrate"
                  color="info"
                  value={VIB_TYPES.longVibrate}
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item lg={3} xs={12} container justifyContent="center">
            <FanbandTerminal params={params}>{terminalScreen}</FanbandTerminal>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <FormButton color="secondary" onClick={handleReset}>
              Reset to default
            </FormButton>
          </Grid>
          <Grid item lg={6} xs={12}>
            <FormButton color="primary" onClick={onSaveAsDefault}>
              Save as default
            </FormButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;
