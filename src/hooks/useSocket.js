import { SOCKET_URL } from 'config';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(SOCKET_URL, {
  reconnectionAttempts: 2,
  timeout: 10000,
  transports: ['websocket'],
  withCredentials: true,
});

const useSocket = (eventName, callback) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return function useSocketCleanup() {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);

  return socket;
};

export default useSocket;
