import { useEffect, useState } from 'react';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import appAxios from '@/lib/axios';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
window.Pusher = Pusher;

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'reverb',
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,

      authorizer: (channel: any) => {
        return {
          authorize: (socketId: any, callback: any) => {
            appAxios
              .post('https://api.jncs-mm.com/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(false, response.data);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
      wsHost: process.env.NEXT_PUBLIC_REVERB_APP_HOST,
      wsPort: process.env.NEXT_PUBLIC_REVERB_APP_PORT ?? 80,
      wssPort: process.env.NEXT_PUBLIC_REVERB_APP_PORT ?? 443,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_APP_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    });

    setEchoInstance(echo as any);
  }, []);

  return echoInstance;
};

export default useEcho;
