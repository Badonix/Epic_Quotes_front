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
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ shouldUnregister: true, mode: 'onChange' });
  const router = useRouter();
  let password = useWatch({ control, name: 'password' });

  let passwordConfirmation = useWatch({
    control,
    name: 'password_confirmation',
  });
  let email = useWatch({ control, name: 'email' });
  let mobileUsername = useWatch({ control, name: 'mobile_username' });

  let avatar = useWatch({ control, name: 'avatar' });
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await fetchCSRFToken();
      let response = await updateProfile(data);
      response.status == 200 && router.reload();
      console.log(response);
    } catch (e: any) {
      console.log(e);
      if (e.response.data.errors.email) {
        setError('email', { type: 'unique', message: 'Email already taken' });
        setConfirmation(false);
      } else if (e.response.data.errors.username) {
        setError('username', {
          type: 'unique',
          message: 'Username already taken',
        });
        setError('mobile_username', {
          type: 'unique',
          message: 'Username already taken',
        });
        setConfirmation(false);
      }
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

  const handleUsernameEdit = () => {
    !mobileUsername
      ? setError('mobile_username', {
          type: 'required',
          message: 'Username is required',
        })
      : setConfirmation(true);
  };
  const handleEmailEdit = () => {
    if (!email) {
      setError('mobile_email', {
        type: 'required',
        message: 'Email is reqiured',
      });
    } else {
      setConfirmation(true);
    }
  };

  const handlePasswordEdit = () => {
    if (!password) {
      setError('mobile_password', {
        type: 'required',
        message: 'Password is reqiured',
      });
    } else if (!passwordConfirmation) {
      setError('mobile_password_confirmation', {
        type: 'required',
        message: 'Password confirmation is required',
      });
    } else if (passwordConfirmation != password) {
      setError('mobile_password_confirmation', {
        type: 'validate',
        message: 'Passwords do not match',
      });
    } else {
      setConfirmation(true);
    }
  };

  useEffect(() => {
    let objectUrl: any;
    if (avatar && avatar[0] instanceof File) {
      objectUrl = URL.createObjectURL(avatar[0]);
      console.log(objectUrl);
      setPreview(objectUrl);
      setConfirmation(true);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
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
    confirmation,
    setConfirmation,
    handleUsernameEdit,
    handleEmailEdit,
    handlePasswordEdit,
    router,
  };
};
