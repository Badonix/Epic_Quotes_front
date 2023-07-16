import { Back, Navbar, ProfileForm, Sidebar } from '@/components';
import { useProfile } from '@/hooks';
import { me } from '@/services';
import { UserType } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const Profile: NextPage<{ user: UserType }> = ({ user }) => {
  const {
    setSidebarActive,
    sidebarActive,
    router,
    confirmation,
    setConfirmation,
  } = useProfile(user);
  const { t } = useTranslation();
  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='md:min-h-screen h-screen md:py-24 flex-col md:flex-row flex lg:pr-16 lg:pl-0 md:px-8'>
        <Sidebar
          user={user}
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='profile'
        />

        <div
          onClick={() => router.back()}
          className={`px-8 py-4 w-full h-5 ${
            !confirmation ? 'flex' : 'hidden'
          } md:hidden mt-88 items-center`}
        >
          <Back />
        </div>
        <div className='md:mt-6 w-full md:h-auto h-full'>
          <h2 className='hidden md:block text-white text-2xl mt-4'>
            {t('profile.my_profile')}
          </h2>
          <div className='w-full flex items-center justify-center h-full'>
            <section className='md:h-auto h-full w-full flex items-center justify-center'>
              <div className='md:py-36 md:h-auto h-full md:bg-sidebar bg-navbar max-w-5xl relative w-full px-4 flex flex-col items-start md:justify-center  justify-start pt-6'>
                <ProfileForm
                  setConfirmation={setConfirmation}
                  confirmation={confirmation}
                  user={user}
                />
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let user;
  const { locale = 'en' } = ctx;

  try {
    user = await me(ctx.req.headers.cookie);
  } catch (e: any) {
    if (e.response.status == 401 || e.response.status == 403) {
      return {
        redirect: {
          destination: `/${locale}/unauthorized`,
          permanent: false,
        },
      };
    } else {
      console.log(e);
    }
  }
  return {
    props: { user: user?.data, ...(await serverSideTranslations(locale)) },
  };
}

export default Profile;
