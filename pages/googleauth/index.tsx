import { fetchCSRFToken, googleSignIn } from '@/services';
import { GetServerSidePropsContext } from 'next';
const GoogleAuth = () => {
  return <></>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code, scope, authuser, hd, prompt } = context?.query;
  console.log(context.req.headers);
  let error;
  if (code) {
    try {
      let response = await fetchCSRFToken();
      await googleSignIn(
        JSON.stringify({ code, scope, authuser, hd, prompt }),
        response.headers.cookie
      );
      return {
        redirect: {
          destination: '/me',
        },
      };
    } catch (e) {
      error = JSON.stringify(e);
      console.log(e);
    }
  }

  return { props: { code, error } };
}
export default GoogleAuth;
