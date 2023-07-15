import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const Unauthorized = () => {
  const { t } = useTranslation();
  return (
    <section className='h-screen flex flex-col items-center justify-center gap-8'>
      <div className='px-6 flex flex-col items-center justify-center gap-8 -translate-y-10'>
        <div className='flex flex-col gap-4 items-center'>
          <img src={'/assets/images/gandolf.png'} className='w-80' />
          <h2 className='text-center text-white md:text-5xl text-2xl'>
            {t('unauthorized.title')}
          </h2>
        </div>
        <p className='text-center text-white text-base md:text-2xl'>
          {t('unauthorized.description')}
        </p>
        <Link
          href='/'
          className='mt-4 text-white cursor-pointer bg-red-600 px-4 py-2 rounded-4'
        >
          {t('unauthorized.return')}
        </Link>
      </div>
    </section>
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
export default Unauthorized;
