import { fetchCSRFToken, updateProfile } from '@/services';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
export const useProfile = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [usernameActive, setUsernameActive] = useState<boolean>(false);
  const [emailActive, setEmailActive] = useState<boolean>(false);
  const [passwordActive, setPasswordActive] = useState<boolean>(false);
  const [preview, setPreview] = useState();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ shouldUnregister: true, mode: 'all' });
  const router = useRouter();
  let password = useWatch({ control, name: 'password' });
  let avatar = useWatch({ control, name: 'avatar' });
  const onSubmit = async (data: any) => {
    try {
      await fetchCSRFToken();
      let response = await updateProfile(data);
      response.status == 200 && router.reload();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const validatePassword = (value: string) => {
    const lowercaseRegex = /[a-z]/g;
    const lowercaseCount = (value?.match(lowercaseRegex) || []).length;

    if (lowercaseCount < 15) {
      return 'Password should contain at least 15 lowercase characters';
    }

    return true;
  };
  useEffect(() => {
    let objectUrl: any;
    if (avatar) {
      objectUrl = URL.createObjectURL(avatar[0]);
      console.log(objectUrl);
      setPreview(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const showLengthError = () => {
    if (password?.length > 8) {
      return 'marker:text-green-300 text-white';
    } else {
      return 'text-gray-600';
    }
  };
  const showLowercaseError = () => {
    if (errors?.password?.type == 'validate' || !password) {
      return 'text-gray-600';
    } else if (password?.length >= 8) {
      return 'marker:text-green-300 text-white';
    } else {
      return 'text-gray-600';
    }
  };
  return {
    sidebarActive,
    validatePassword,
    setSidebarActive,
    usernameActive,
    setUsernameActive,
    emailActive,
    setEmailActive,
    passwordActive,
    register,
    setPasswordActive,
    onSubmit,
    reset,
    password,
    handleSubmit,
    errors,
    showLengthError,
    showLowercaseError,
    setPreview,
    preview,
  };
};
