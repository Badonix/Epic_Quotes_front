import { Back, Navbar, ProfileForm, Sidebar } from '@/components';
import { useProfile } from '@/hooks';
import { me } from '@/services';
import { GetServerSidePropsContext } from 'next';

export const Profile = ({ user }: any) => {
  const {
    setSidebarActive,
    sidebarActive,
    router,
    confirmation,
    setConfirmation,
  } = useProfile();
  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='md:min-h-screen h-screen md:py-24 flex-col md:flex-row flex lg:pr-16 lg:pl-0 md:px-8'>
        <Sidebar
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
            My profile
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
  try {
    user = await me(ctx.req.headers.cookie);
  } catch (e) {
    console.log(e);
  }
  return { props: { user: user?.data } };
}

export default Profile;
