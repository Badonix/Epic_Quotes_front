import { ModalProvider } from '@/context';
import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { useForm, FormProvider } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
export default function App({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
        </ModalProvider>
      </FormProvider>
    </QueryClientProvider>
  );
}
