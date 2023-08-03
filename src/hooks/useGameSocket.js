import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setGames,
  setSelectedGame,
  setClosestUpcomingGame,
} from 'redux/actions/games';
import { useSocket } from 'hooks';
import { WS_EVENTS } from 'utils/constants';

const useGameSocket = () => {
  const dispatch = useDispatch();
  const { results = [], select = {} } = useSelector((state) => state.games);

  const liveGameHandler = useCallback(
    (game) => {
      try {
        const newGames = results.map((item) =>
          item.id === game.id ? game : item
        );
        dispatch(setGames(newGames));

        if (select.id === game.id) {
          dispatch(setSelectedGame(game));
        }

        dispatch(setClosestUpcomingGame(game));
      } catch (error) {
        console.log(error);
      }
    },
    [results, select, dispatch]
  );

  useSocket(WS_EVENTS.LIVE_GAME_UPDATE, liveGameHandler);
};

export default useGameSocket;
