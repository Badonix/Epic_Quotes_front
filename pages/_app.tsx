import { ModalProvider, NotificationsProvider } from '@/context';
import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { useForm, FormProvider } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
const App = ({ Component, pageProps }: AppProps) => {
  const methods = useForm();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>
        <ModalProvider>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalProvider>
      </FormProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
