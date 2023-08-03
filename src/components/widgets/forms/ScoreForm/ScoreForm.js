import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import { isEmpty } from 'utils/helpers';
import {
  STRING_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
  GAME_STATUS,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpTextField,
  ScoreScreen,
} from 'components';

const schema = yup.object().shape({
  title: yup.string().required(),
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

const ScoreForm = ({
  onSubmit,
  onDelete,
  mode = ALERT_FORM_MODES.creating,
  defaultValues = null,
  deleting = false,
}) => {
  const classes = useStyles();
  const { selectedGame: game } = useSelector((state) => state.games);
  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );
  const disabledSending = useMemo(
    () =>
      (!game || game.gameStatus !== GAME_STATUS.inProgress) &&
      mode !== ALERT_FORM_MODES.saving,
    [game, mode]
  );
  const alertTitle = useMemo(() => {
    if (isEmpty(game)) {
      return '0 - 0';
    }
    if (game.homeTeam.abbreviation === 'ATL') {
      return `${game.homeTeamScore} - ${game.visitorTeamScore}`;
    }
    return `${game.visitorTeamScore} - ${game.homeTeamScore}`;
  }, [game]);

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
      title:
        mode === ALERT_FORM_MODES.updating ? defaultValues?.title : alertTitle,
      body: '',
      ..._.pick(defaultValues, ['body']),
    },
  });
  const bodyText = watch('body');

  const submitHandler = async (data) => {
    await onSubmit({ ..._.pick(data, ['title', 'body']), ...alertParams });
    if (
      mode === ALERT_FORM_MODES.creating ||
      mode === ALERT_FORM_MODES.saving
    ) {
      resetForm();
    }
  };

  const resetForm = () => {
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
        <Grid item lg={9} xs={12} container spacing={4}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Score alert Title"
              error={errors.title?.message}
              control={control}
              fullWidth
              inputProps={{ readOnly: mode === ALERT_FORM_MODES.creating }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="body"
              label="Score description"
              error={errors.body?.message}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width={350}
              terminalScreen={<ScoreScreen game={game} text={bodyText} />}
            />
          </Grid>
        </Grid>
        <Grid container item lg={3} xs={12} justifyContent="flex-end">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <ScoreScreen game={game} text={bodyText} />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box mt={2} display="flex">
        {mode === ALERT_FORM_MODES.creating ? (
          <FormButton type="submit" disabled={disabledSending}>
            Send
          </FormButton>
        ) : (
          <FormButton type="submit">Save</FormButton>
        )}
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

export default memo(ScoreForm);
