import { GetStaticPropsContext, NextPage } from 'next';
import {
  Quote,
  Signup,
  Login,
  CheckEmail,
  EmailVerified,
  ForgotPassword,
  ResetSuccess,
  LandingNavbar,
  PasswordResetCheck,
} from '@/components';
import { ModalContext } from '@/context';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { openModal } = useContext(ModalContext);
  return (
    <div className='relative h-screen'>
      {openModal === 'signup' && <Signup />}
      {openModal === 'login' && <Login />}
      {openModal === 'checkEmail' && <CheckEmail />}
      {openModal === 'verified' && <EmailVerified />}
      {openModal === 'forgotPassword' && <ForgotPassword />}
      {openModal === 'passwordResetCheck' && <PasswordResetCheck />}
      {openModal === 'resetSuccess' && <ResetSuccess />}
      <LandingNavbar />
      <main className='h-75sc flex items-center justify-center'>
        <div className='flex items-center justify-center flex-col px-16'>
          <h2 className='leading-90 md:text-6xl text-4xl max-w-2xl text-center text-orange-200'>
            {t('landing.welcome')}
          </h2>
          <button className='pointer hover:bg-red-700 transition-all mt-10 md:mt-6 py-2 px-6 bg-red-600 rounded-md text-white'>
            {t('landing.get_started')}
          </button>
        </div>
      </main>
      <div>
        <Quote image={'bg-image1.webp'} />
        <Quote image={'bg-image2.webp'} />
        <Quote image={'bg-image3.webp'} />
      </div>
    </div>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale = 'en' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Home;
