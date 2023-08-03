import { memo, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_FORM_MODES, DEFAULT_ALERT_PARAMS } from 'utils/constants';
import {
  FormButton,
  AlertField,
  FanbandTerminal,
  FullScreen,
} from 'components';
import { isEmpty, showErrorToast } from 'utils/helpers';
import ImageList from 'components/elements/ImageList';
import { Title } from 'components/elements';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncAction } from 'hooks';
import { getGamedayPresets, uploadGamedayPresets } from 'redux/actions';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageListLabel: {
    fontSize: 14,
    marginBottom: 32,
  },
  uploadButton: {
    width: 252,
    marginBottom: 67,
  },
  imageSelectLabel: {
    fontSize: 14,
    marginBottom: 33,
  },
  emptyPresetLabel: {
    fontSize: 20,
    fontFamily: theme.custom.fonts.SFUITextBoldItalic,
    color: '#b0b0b0',
  },
  presetPanel: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  presetItem: {
    borderRadius: 14,
    padding: '5px 10px 15px 10px',
    marginRight: 8,
    '&:hover': {
      border: `solid 2px #c3c3c3`,
      padding: '3px 8px 13px 8px',
    },
  },
  presetItemLabel: {
    fontFamily: theme.custom.fonts.SFUIText,
    fontSize: 12,
    lineHeight: 1.83,
    color: '#c3c3c3',
  },
  presetItemSelected: {
    padding: '2px 7px 12px 7px !important',
    border: `solid 3px ${theme.palette.primary.main} !important`,
    '& > p': {
      color: '#000',
    },
  },
  presetImage: {
    width: 80,
    height: 160,
    objectFit: 'contain',
  },
}));

const GamedayThemeForm = ({
  onSubmit,
  mode = ALERT_FORM_MODES.creating,
  defaultValues = null,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [imageList, setImageList] = useState([]);
  const { gamedayPresets } = useSelector((state) => state.notifications);
  const [imageIndex, setImageIndex] = useState(defaultValues?.imageIndex || -1);

  useAsyncAction(getGamedayPresets(), !gamedayPresets.length);

  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );

  const resetParams = (params) => {
    setAlertParmas(isEmpty(params) ? DEFAULT_ALERT_PARAMS() : params);
  };

  const handleParamsChange = ({ target: { name, value } }) =>
    setAlertParmas((params) => ({ ...params, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageIndex < 0 || imageIndex > 8) {
      showErrorToast('Please choose gameday theme image!');
    }

    await onSubmit({
      title: 'Gameday',
      body: 'Gameday',
      imageIndex,
      ...alertParams,
    });

    if (
      mode === ALERT_FORM_MODES.creating ||
      mode === ALERT_FORM_MODES.saving
    ) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
    resetParams();
  };

  const handleUploadPresets = async () => {
    await dispatch(uploadGamedayPresets(imageList.map((img) => img.file)));
    setImageList([]);
  };

  const handleSelectImage = (idx) => {
    setImageIndex(idx);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.imageListLabel}>
            Select Gameday Images for Preloading
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageList images={imageList} onChange={setImageList} mb="33px" />
        </Grid>
        <Grid item xs={12}>
          <FormButton
            className={classes.uploadButton}
            disabled={!imageList.length}
            onClick={handleUploadPresets}
          >
            Upload
          </FormButton>
        </Grid>
        <Grid item container lg={9} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Title mb={1}>CREATE GAMEDAY THEME ALERT</Title>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.imageListLabel}>
              Select Gameday Images for Preloading
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {gamedayPresets.length ? (
              <div className={classes.presetPanel}>
                {gamedayPresets.map((img, idx) => (
                  <div
                    key={img}
                    className={clsx(classes.presetItem, {
                      [classes.presetItemSelected]: idx === imageIndex,
                    })}
                    onClick={() => handleSelectImage(idx)}
                  >
                    <Typography className={classes.presetItemLabel}>
                      Image {idx}
                    </Typography>
                    <img src={img} className={classes.presetImage} />
                  </div>
                ))}
              </div>
            ) : (
              <Typography className={classes.emptyPresetLabel}>
                Please upload Gameday Images above first
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width="252px"
              mt={3}
              mb={5}
              terminalScreen={
                <FullScreen imageUrl={gamedayPresets?.[imageIndex]} />
              }
            />
          </Grid>
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <FanbandTerminal params={alertParams} disabledAnimation mb={5}>
            <FullScreen imageUrl={gamedayPresets?.[imageIndex]} />
          </FanbandTerminal>
        </Grid>
        <Grid item xs={12}>
          <FormButton onClick={handleSubmit}>
            {mode === ALERT_FORM_MODES.updating ||
            mode === ALERT_FORM_MODES.saving
              ? 'Save'
              : 'Send'}
          </FormButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(GamedayThemeForm);
