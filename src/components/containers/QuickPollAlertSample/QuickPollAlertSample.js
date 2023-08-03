import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Box,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { FHCard, FHCardHeader, FHCardContent, Title } from 'components';
import { useAsyncAction } from 'hooks';
import { getFanbands, getNotifications } from 'redux/actions';
import { ArrowBack } from '@material-ui/icons';
import { ALERT_PROTO_TYPES, LINKS } from 'utils/constants';
import { formatPhone, isEmpty } from 'utils/helpers';
import QuickPollSampleTable from 'components/widgets/tables/QuickPollSampleTable';

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 196,
    height: 41,
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'solid 1px #e0e1f2',
      borderRadius: 5,
    },
    '& .MuiSelect-selectMenu': {
      fontFamily: theme.custom.fonts.SFProTextMedium,
      fontSize: 14,
      color: '#000',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    },
  },
}));

const QuickPollAlertSample = ({ alertId }) => {
  const classes = useStyles();
  const router = useRouter();

  const fanbands = useSelector((state) => state.main.fanbands.results);
  const quickPoll = useSelector((state) =>
    state.notifications.survey.results.find((a) => a.id === alertId)
  );

  useAsyncAction(getFanbands(), isEmpty(fanbands));
  useAsyncAction(
    getNotifications(ALERT_PROTO_TYPES.survey),
    isEmpty(quickPoll)
  );

  const [filter, setFilter] = useState(-1);
  const answers = useMemo(() => {
    if (isEmpty(quickPoll?.surveyAnswers)) {
      return [];
    }
    return quickPoll.surveyAnswers
      .filter((ans) => filter < 0 || ans.answer === filter)
      .filter((ans) => ans.answer >= 0)
      .map((ans) => ({
        ...ans,
        phone: formatPhone(fanbands.find((f) => f.id === ans.userId)?.phone),
        response: quickPoll.surveyResponses[ans.answer].response,
      }));
  }, [filter, quickPoll, fanbands]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleGoBack = () => {
    router.push(LINKS.quickPollSent.path);
  };

  return (
    <FHCard>
      <FHCardHeader
        title={
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleGoBack}>
              <ArrowBack />
            </IconButton>
            <Title>{quickPoll?.title || 'Quick Poll'} Responses</Title>
          </Box>
        }
        action={
          quickPoll && (
            <Select
              variant="outlined"
              className={classes.select}
              value={filter}
              onChange={handleChange}
            >
              <MenuItem value={-1}>All Responses</MenuItem>
              {quickPoll.surveyResponses.map((res, idx) => (
                <MenuItem key={idx} value={idx}>
                  {res.response}
                </MenuItem>
              ))}
            </Select>
          )
        }
      />
      <FHCardContent>
        <QuickPollSampleTable answers={answers} />
      </FHCardContent>
    </FHCard>
  );
};

export default QuickPollAlertSample;
