import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
export const Unauthorized = () => {
  const { t } = useTranslation();
  return (
    <section className='h-screen flex flex-col items-center justify-center gap-8'>
      <div className='px-6 flex flex-col items-center justify-center gap-8 -translate-y-10'>
        <div className='flex flex-col gap-12 items-center'>
          <img src={'/assets/images/ghost.png'} className='h-40' />
          <h2 className='text-center text-white md:text-5xl text-2xl'>
            Whoops!
          </h2>
        </div>
        <p className='text-center text-white text-base md:text-2xl'>
          {t('not_found.description')}
        </p>
        <Link
          href='/'
          className='mt-4 text-white cursor-pointer bg-red-600 px-4 py-2 rounded-4'
        >
          {t('not_found.return')}
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
