import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher;
  }
}

export function instantiatePusher() {
  if (typeof window !== 'undefined') {
    window.Pusher = Pusher;
    window.Echo = new Echo({
      authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/broadcasting/auth`,
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      forceTLS: true,
      cluster: ['eu'],
      authorizer: (channel: { name: string }) => {
        return {
          authorize: (socketId: string, callback: Function) => {
            axios
              .post(
                process.env.NEXT_PUBLIC_API_URL + '/broadcasting/auth',
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
                { withCredentials: true }
              )
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error);
              });
          },
        };
      },
    });
  }
}
