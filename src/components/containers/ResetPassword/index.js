import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as authAPI from 'services/api-auth';
import { ExpTextField, AuthWrapper } from 'components';
import { useLoading } from 'hooks';
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast';
import { PASSWORD_VALID, CONFIRM_PASSWORD_VALID, LINKS } from 'utils/constants';
import { Button, makeStyles, Typography } from '@material-ui/core';

const schema = yup.object().shape({
  password: PASSWORD_VALID,
  confirmPassword: CONFIRM_PASSWORD_VALID,
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.spacing(3),
    height: 50,
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.custom.palette.red,
  },
}));

const ResetPassword = () => {
  const router = useRouter();
  const classes = useStyles();
  const { changeLoadingStatus } = useLoading();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data) => {
      changeLoadingStatus(true);
      try {
        const params = {
          token: router.query.token,
          password: data.password,
        };

        const { message } = await authAPI.resetPassword(params);
        showSuccessToast(message);
        router.push(LINKS.signIn.path);
      } catch (error) {
        if (error.response) {
          const { data: { message = [] } = {} } = error.response;
          showErrorToast(message[0]);
        }
      }
      changeLoadingStatus(false);
    },
    [router, changeLoadingStatus]
  );

  return (
    <AuthWrapper title="Reset Password">
      <Typography className={classes.emailLabel}>
        {router.query.email}
      </Typography>
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<ExpTextField />}
          name="password"
          type="password"
          label="New Password"
          error={errors.password?.message}
          className={classes.input}
          control={control}
          defaultValue=""
        />
        <Controller
          as={<ExpTextField />}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          className={classes.input}
          control={control}
          defaultValue=""
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          className={classes.button}
        >
          Reset Password
        </Button>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          className={classes.button}
          href={LINKS.signIn.path}
        >
          Cancel
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default memo(ResetPassword);
