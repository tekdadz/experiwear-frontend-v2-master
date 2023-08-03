import React, { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FanbandSelector, FormButton, ExpTextField } from 'components';
import { Grid } from '@material-ui/core';

const schema = yup
  .object({
    barcode: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'Must be exactly 12, 14, 16 or 20 digit barcode', (val) =>
        [12, 14, 16, 20].includes(val.length)
      ),
    section: yup
      .string()
      .required()
      .matches(/^[0-9A-Za-z]+$/, 'Must be only symbols')
      .max(6, '6 chars max'),
    row: yup
      .string()
      .required()
      .matches(/^[0-9A-Za-z]+$/, 'Must be only symbols')
      .max(4, '4 chars max'),
    seat: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .max(5, '5 digits max'),
    order: yup
      .string()
      .matches(/^[0-9A-Za-z]+$/, 'Must be only symbols')
      .max(12, '12 chars max'),
    userId: yup.string(),
  })
  .required();

const TicketForm = ({
  defaultValues = {},
  onSubmit,
  onDelete,
  updating = false,
}) => {
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      barcode: '',
      section: '',
      row: '',
      seat: '',
      order: '',
      userId: '',
      ...defaultValues,
    },
  });

  const submitHandler = async (data) => {
    await onSubmit(data);
    if (!updating) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="barcode"
            label="Barcode"
            placeholder="Barcode"
            error={errors.barcode?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="section"
            label="Section"
            placeholder="Section"
            error={errors.section?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="row"
            label="Row"
            placeholder="Row"
            error={errors.row?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="seat"
            label="Seat"
            placeholder="Seat"
            error={errors.seat?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="order"
            label="Order"
            placeholder="Order"
            error={errors.order?.message}
            fullWidth
            as={<ExpTextField />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="userId"
            label="Assign to Fanband"
            placeholder="Assign to Fanband"
            error={errors.userId?.message}
            fullWidth
            as={<FanbandSelector />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormButton type="submit" color="primary">
            Save
          </FormButton>
        </Grid>
        {updating && (
          <Grid item xs={12}>
            <FormButton color="secondary" onClick={onDelete}>
              Delete
            </FormButton>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default memo(TicketForm);
