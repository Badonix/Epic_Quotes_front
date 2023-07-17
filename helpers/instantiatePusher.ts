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
      authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      forceTLS: true,
      cluster: ['eu'],
      auth: { withCredentials: true },
    });
  }
}
