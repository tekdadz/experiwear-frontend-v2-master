import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as authAPI from 'services/api-auth';
import { ExpTextField, AuthWrapper } from 'components';
import useLoading from 'hooks/useLoading';
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast';
import { EMAIL_VALID, LINKS } from 'utils/constants';
import { Button, makeStyles } from '@material-ui/core';

const schema = yup.object().shape({
  email: EMAIL_VALID,
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
    width: '100%',
  },
  button: {
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.spacing(3),
    height: 50,
  },
}));

const ForgotPassword = () => {
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
          email: data.email,
        };

        const { message } = await authAPI.forgotPassword(params);
        showSuccessToast(message);
        router.push({
          pathname: LINKS.resetPassword.path,
          query: { email: data.email },
        });
      } catch (error) {
        showErrorToast(
          'Your email does not existed. Please input correct email.'
        );
      }
      changeLoadingStatus(false);
    },
    [router, changeLoadingStatus]
  );

  return (
    <AuthWrapper title="Reset Password">
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<ExpTextField />}
          name="email"
          type="email"
          label="E-mail"
          error={errors.email?.message}
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
          Submit
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

export default memo(ForgotPassword);
