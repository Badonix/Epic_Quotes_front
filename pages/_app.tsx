import { ModalProvider } from '@/context';
import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { useForm, FormProvider } from 'react-hook-form';

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </FormProvider>
  );
}
