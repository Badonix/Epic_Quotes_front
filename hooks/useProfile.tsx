import { fetchCSRFToken, updateProfile } from '@/services';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
export const useProfile = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [usernameActive, setUsernameActive] = useState<boolean>(false);
  const [emailActive, setEmailActive] = useState<boolean>(false);
  const [passwordActive, setPasswordActive] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ shouldUnregister: true, mode: 'all' });
  let password = useWatch({ control, name: 'password' });
  const onSubmit = async (data: any) => {
    let response;
    if (data.length) {
      await fetchCSRFToken();
      response = await updateProfile(data);
    }
    console.log(response);
  };
  const validatePassword = (value: string) => {
    const lowercaseRegex = /[a-z]/g;
    const lowercaseCount = (value?.match(lowercaseRegex) || []).length;

    if (lowercaseCount < 15) {
      return 'Password should contain at least 15 lowercase characters';
    }

    return true;
  };

  const showLengthError = () => {
    if (password?.length > 8) {
      return 'marker:text-green-400 text-white';
    } else {
      return 'text-gray-600';
    }
  };
  const showLowercaseError = () => {
    if (errors?.password?.type == 'validate' || !password) {
      return 'text-gray-600';
    } else if (password?.length >= 8) {
      return 'marker:text-green-400 text-white';
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
  };
};
