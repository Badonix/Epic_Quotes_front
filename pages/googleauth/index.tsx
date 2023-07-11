import { googleSignIn } from '@/services';
import { GetServerSidePropsContext } from 'next';
const GoogleAuth = () => {
  return <></>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code, scope, authuser, hd, prompt } = context?.query;
  if (code) {
    try {
      const googleResponse = await googleSignIn(
        JSON.stringify({ code, scope, authuser, hd, prompt }),
        context.req.headers.cookie
      );
      context.res.setHeader(
        'set-cookie',
        googleResponse.headers['set-cookie']!
      );
      return {
        redirect: {
          destination: '/me',
        },
      };
    } catch (e) {}
  }

  return {};
}
export default GoogleAuth;
