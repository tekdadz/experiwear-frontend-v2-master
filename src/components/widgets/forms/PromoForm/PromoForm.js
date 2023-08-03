import { memo, useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import {
  TITLE_VALID,
  STRING_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpImageField,
  ExpTextField,
  ImageScreen,
  PhonePicker,
  TextScreen,
} from 'components';

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID,
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const PromoForm = ({
  onSubmit,
  onDelete,
  mode = ALERT_FORM_MODES.creating,
  defaultValues = null,
  deleting = false,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );
  const [sendTo, setSendTo] = useState([]);
  const enabledSending =
    mode === ALERT_FORM_MODES.updating && deleting === false;
  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );

  const resetParams = (params) => {
    setAlertParmas(params || DEFAULT_ALERT_PARAMS());
  };

  const handleParamsChange = useCallback(
    ({ target: { name, value } }) =>
      setAlertParmas((params) => ({ ...params, [name]: value })),
    []
  );

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      body: '',
      ..._.pick(defaultValues, ['title', 'body']),
    },
  });
  const titleText = watch('title');
  const bodyText = watch('body');

  const handleSend = async () => {
    await onSubmit({
      title: titleText,
      body: bodyText,
      ...alertParams,
      sendTo,
      file: image?.file,
      sending: true,
    });
  };

  const submitHandler = async (data) => {
    await onSubmit({
      ..._.pick(data, ['title', 'body']),
      ...alertParams,
      sendTo,
      file: image?.file,
    });
    if (
      mode === ALERT_FORM_MODES.creating ||
      mode === ALERT_FORM_MODES.saving
    ) {
      resetForm();
    }
  };

  const resetForm = () => {
    reset();
    setImage(null);
    setSendTo([]);
    resetParams();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid item container lg={9} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Promo Alert Title"
              error={errors.title?.message}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              multiline
              rows={5}
              name="body"
              label="Promo Body Text"
              error={errors.body?.message}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <ExpImageField
              label="Image"
              image={image}
              onChange={setImage}
              width="100%"
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width="100%"
              mt={3}
              terminalScreen={
                <ImageScreen imageUrl={image?.url} text={titleText} />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <PhonePicker
              label="Send alert to"
              placeholder="Everyone"
              error={errors.userId?.message}
              value={sendTo}
              onChange={(ev, value) => setSendTo(value)}
              fullWidth
              mb={3}
            />
          </Grid>
        </Grid>
        <Grid container item lg={3} xs={12} justifyContent="center">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <TextScreen text={titleText} />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box
        mt={2}
        display="flex"
        flexDirection={enabledSending ? 'column' : 'row'}
      >
        {enabledSending && (
          <Box mb={2}>
            <FormButton variant="outlined" onClick={handleSend}>
              Send
            </FormButton>
          </Box>
        )}
        <FormButton type="submit">
          {mode === ALERT_FORM_MODES.updating ||
          mode === ALERT_FORM_MODES.saving
            ? 'Save'
            : 'Send'}
        </FormButton>
        {deleting && (
          <Box ml={2} width="100%">
            <FormButton color="secondary" onClick={onDelete}>
              Delete
            </FormButton>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default memo(PromoForm);
