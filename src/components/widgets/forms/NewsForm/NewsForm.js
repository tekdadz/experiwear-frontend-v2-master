import { memo, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
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
  TextScreen,
} from 'components';

const schema = object().shape({
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
}));

const NewsForm = ({
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
  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
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

  const resetParams = (params) =>
    setAlertParmas(params || DEFAULT_ALERT_PARAMS());
  const handleParamsChange = ({ target: { name, value } }) =>
    setAlertParmas((params) => ({ ...params, [name]: value }));

  const submitHandler = async (data) => {
    await onSubmit({
      ..._.pick(data, ['title', 'body']),
      ...alertParams,
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
    setImage(null);
    reset();
    resetParams();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid container item lg={9} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              control={control}
              name="title"
              label="News Alert Title"
              error={errors.title?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              control={control}
              multiline
              rows={5}
              name="body"
              label="News Body Text"
              error={errors.body?.message}
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
        </Grid>
        <Grid item lg={3} xs={12} container justifyContent="center">
          <Grid item>
            <FanbandTerminal params={alertParams} disabledAnimation>
              <TextScreen text={titleText} />
            </FanbandTerminal>
          </Grid>
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

export default memo(NewsForm);
