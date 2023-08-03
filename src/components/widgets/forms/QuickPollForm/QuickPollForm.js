import { memo, useCallback, useState } from 'react';
import { Button, IconButton, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import {
  TITLE_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
  STRING_VALID,
  MAX_FIRMWARE_STRING_WIDTH,
  MAX_RESPONSE_NUMBER,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpImageField,
  ExpTextField,
  QuickPollScreen,
} from 'components';
import { calcStringWidthForFirmware } from 'utils/helpers';

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  anotherResponseButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    marginBottom: 30,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));

const QuickPollForm = ({
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
  const [responses, setResponses] = useState(
    defaultValues
      ? defaultValues.surveyResponses.map((res) => res.response || '')
      : ['', '']
  );
  const [responseErrors, setResponseErrors] = useState({});

  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );

  const addResponse = () => {
    setResponses((prevState) =>
      prevState.length < MAX_RESPONSE_NUMBER ? [...prevState, ''] : prevState
    );
  };

  const resetParams = (params) => {
    setAlertParmas(params || DEFAULT_ALERT_PARAMS());
  };

  const handleParamsChange = useCallback(({ target: { name, value } }) => {
    setAlertParmas((params) => ({ ...params, [name]: value }));
  }, []);

  const handleResponseChange = (idx) => (e) => {
    try {
      STRING_VALID.validateSync(e.target.value);

      if (
        calcStringWidthForFirmware(e.target.value) > MAX_FIRMWARE_STRING_WIDTH
      ) {
        setResponseErrors((errs) => ({
          ...errs,
          [idx]: 'Text length is too long',
        }));
      } else {
        setResponseErrors((errs) => ({ ...errs, [idx]: null }));
      }
    } catch (err) {
      setResponseErrors((errs) => ({
        ...errs,
        [idx]: err.message,
      }));
    }

    setResponses((res) => res.map((r, i) => (i === idx ? e.target.value : r)));
  };

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      body: '',
      ..._.pick(defaultValues, ['title', 'body']),
    },
  });
  const questionTxt = watch('body');

  const submitHandler = async (data) => {
    await onSubmit({
      ..._.pick(data, ['title', 'body']),
      ...alertParams,
      file: image?.file,
      responses: responses.map((resp) => resp.replace(',', ':&')),
    });
    if (
      mode === ALERT_FORM_MODES.creating ||
      mode === ALERT_FORM_MODES.saving
    ) {
      resetForm();
    } else {
      setResponses((res) => res.map((r) => r.replace(':&', ',')));
    }
  };

  const resetForm = () => {
    setImage(null);
    setResponses(['', '']);
    resetParams();
    reset();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid item lg={9} xs={12} container spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Quick Poll title"
              error={errors.title?.message}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="body"
              label="Quick Poll question"
              error={errors.body?.message}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {responses.map((res, idx) => (
              <Box key={idx} display="flex" mb={2}>
                <ExpTextField
                  name={`response${idx}`}
                  label={`Response #${idx + 1}`}
                  value={res}
                  error={responseErrors[idx]}
                  fullWidth
                  onChange={handleResponseChange(idx)}
                />
                {responses.length > 2 && (
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        setResponses((res) => res.filter((r, i) => i !== idx))
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.anotherResponseButton}
              fullWidth={false}
              onClick={addResponse}
              disabled={responses.length >= MAX_RESPONSE_NUMBER}
            >
              Add another response
            </Button>
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
              width="90%"
              mt={3}
              terminalScreen={
                <QuickPollScreen text={questionTxt} responses={responses} />
              }
            />
          </Grid>
        </Grid>
        <Grid container item lg={3} xs={12} justifyContent="center">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <QuickPollScreen text={questionTxt} responses={responses} />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box mt={2} display="flex">
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

export default memo(QuickPollForm);
