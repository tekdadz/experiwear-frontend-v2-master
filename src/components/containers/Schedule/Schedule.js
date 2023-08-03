import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  createAlert,
  modifyScheduledAlert,
  removeScheduledAlert,
} from 'redux/actions';
import {
  CalendarIcon,
  CardHeaderButton,
  DatetimePicker,
  ExpSelect,
  NewsForm,
  PromoForm,
  QuickPollForm,
  ScoreForm,
  GamedayThemeForm,
  LeftContainer,
  FHCard,
  FHCardContent,
  FHCardHeader,
  ConfirmDialog,
} from 'components';
import {
  ALERT_PROTO_TYPES,
  ALERT_PROTO_LABELS,
  ALERT_FORM_MODES,
  LINKS,
} from 'utils/constants';
import { showWarningToast } from 'utils/helpers';
import moment from 'moment';

const Schedule = ({
  defaultValues = null,
  mode = ALERT_FORM_MODES.creating,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [type, setAlertType] = useState(
    defaultValues ? defaultValues.type : ALERT_PROTO_TYPES.news
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [datetime, setDatetime] = useState(
    defaultValues ? new Date(defaultValues.scheduledTime) : null
  );
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      if (!datetime) {
        return showWarningToast(
          'Please set schedule date over current time exactly!'
        );
      }

      if (mode === ALERT_FORM_MODES.updating) {
        await dispatch(
          modifyScheduledAlert(defaultValues.id, {
            ...data,
            type,
            scheduledTime: datetime,
          })
        );
      } else {
        await dispatch(createAlert(type, data, datetime));
      }
    },
    [type, datetime, defaultValues, mode, dispatch]
  );

  const handleDelete = async () => {
    await dispatch(removeScheduledAlert(defaultValues.id));
    router.push(LINKS.schedule.path);
  };

  const AlertForm = useMemo(() => {
    switch (type) {
      case ALERT_PROTO_TYPES.news:
        return NewsForm;
      case ALERT_PROTO_TYPES.survey:
        return QuickPollForm;
      case ALERT_PROTO_TYPES.score:
        return ScoreForm;
      case ALERT_PROTO_TYPES.promo:
        return PromoForm;
      case ALERT_PROTO_TYPES.gameday:
        return GamedayThemeForm;
      default:
        return NewsForm;
    }
  }, [type]);

  const handleDatetimeClick = useCallback(
    (e) => {
      if (!datetime) {
        setDatetime(new Date());
      }
      setAnchorEl(e.target);
    },
    [datetime]
  );

  return (
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
          title={
            mode === ALERT_FORM_MODES.updating
              ? 'Update Scheduled Alert'
              : 'Create Scheduled Alert'
          }
          subheader={
            <CardHeaderButton
              startIcon={<CalendarIcon />}
              onClick={handleDatetimeClick}
              variant={datetime ? 'outlined' : 'contained'}
            >
              {datetime
                ? moment(datetime).format('MMM D @ hh:mm A')
                : 'Set date and time'}
            </CardHeaderButton>
          }
        />
        <FHCardContent>
          {mode === ALERT_FORM_MODES.creating && (
            <ExpSelect
              name="type"
              label="Alert type"
              items={Object.values(ALERT_PROTO_TYPES).map((type) => ({
                value: type,
                label: ALERT_PROTO_LABELS[type],
              }))}
              value={type}
              onChange={(e) => setAlertType(e.target.value)}
            />
          )}
          <AlertForm
            onSubmit={handleSubmit}
            onDelete={() => setConfirmDialogOpen(true)}
            mode={mode}
            defaultValues={defaultValues}
            deleting={mode === ALERT_FORM_MODES.updating}
          />
          <DatetimePicker
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            value={datetime}
            onChange={setDatetime}
          />
          <ConfirmDialog
            open={confirmDialogOpen}
            title="Delete scheduled alert"
            contentText="Do you really want to delete this pending alert?"
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={handleDelete}
          />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(Schedule);
