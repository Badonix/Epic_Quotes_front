import { useRouter } from 'next/router';
import { googleSignIn } from '@/services';
const GoogleAuth = () => {
  const router = useRouter();
  const { code, scope, authuser, hd, prompt } = router.query;
  if (code) {
    console.log(
      googleSignIn(
        JSON.stringify({ code, scope, authuser, hd, prompt }),
        router
      )
    );
  }
  return <></>;
};
export default GoogleAuth;
