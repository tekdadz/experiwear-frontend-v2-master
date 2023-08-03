import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setNotifications,
  setLatestNotification,
  setFanbandsStatistics,
} from 'redux/actions';
import { useSocket } from 'hooks';
import { WS_EVENTS, ALERT_PROTO_TYPES } from 'utils/constants';
import { isEmpty } from 'utils/helpers';

const useFanbandSocket = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const inAreaHandler = useCallback(
    (statistics) => {
      dispatch(setFanbandsStatistics(statistics));
    },
    [dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_IN_AREA, inAreaHandler);

  const statusHandler = useCallback(
    ({ online = 0, offline = 0 }) => {
      dispatch(
        setFanbandsStatistics({ online, offline, total: online + offline })
      );
    },
    [dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_STATUS, statusHandler);

  const reactHandler = useCallback(
    ({ id, type }) => {
      try {
        if (!Object.values(ALERT_PROTO_TYPES).includes(type)) {
          return;
        }

        const { results = [] } = notifications[type];
        const { latest = {} } = notifications;

        const updateAlert = (item) => ({
          ...item,
          opened: (item?.opened || 0) + 1,
        });

        const newNotifications = results.map((item) =>
          item.id === id ? updateAlert(item) : item
        );
        dispatch(setNotifications(type, newNotifications));

        if (latestId === id && !isEmpty(latest)) {
          dispatch(setLatestNotification(type, updateAlert(latest)));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [notifications, dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_REACT, reactHandler);

  const answerHandler = useCallback(
    ({ id, type, answer, userId }) => {
      try {
        if (!Object.values(ALERT_PROTO_TYPES).includes(type) || answer < 0) {
          return;
        }

        const { results = [] } = notifications[type];
        const { latestSurvey = {} } = notifications;

        const updateSurveryAlert = (item) => {
          const createdAt = new Date().toISOString();
          const surveyResponses = item.surveyResponses.map((r, idx) =>
            idx === answer ? { ...r, count: (r.count || 0) + 1 } : r
          );
          const answerItem = { userId, answer, createdAt };
          const surveyAnswers = isEmpty(item.surveyAnswers)
            ? [answerItem]
            : item.surveyAnswers.findIndex((ans) => ans.userId === userId) < 0
            ? item.surveyAnswers.concat(answerItem)
            : item.surveyAnswers;

          return {
            ...item,
            surveyResponses,
            surveyAnswers,
          };
        };

        const newNotifications = results.map((item) =>
          item.id === id ? updateSurveryAlert(item) : item
        );
        dispatch(setNotifications(type, newNotifications));

        if (id === latestSurvey.id && !isEmpty(latestSurvey)) {
          dispatch(
            setLatestNotification(type, updateSurveryAlert(latestSurvey))
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [notifications, dispatch]
  );
  useSocket(WS_EVENTS.FANBAND_ANSWER, answerHandler);
};

export default useFanbandSocket;
