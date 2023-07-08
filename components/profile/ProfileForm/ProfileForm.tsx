import React from 'react';
import { useProfileForm } from './useProfileForm';
import { ErrorMessage } from '@hookform/error-message';
import { showLowercaseError, showLengthError } from './helpers';
import { ProfileFormProps } from './types';
export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  setConfirmation,
  confirmation,
}) => {
  const {
    emailActive,
    passwordActive,
    setEmailActive,
    setPasswordActive,
    setUsernameActive,
    usernameActive,
    handleSubmit,
    onSubmit,
    setPreview,
    validatePassword,
    handleUsernameEdit,
    errors,
    register,
    password,
    reset,
    preview,
    handleEmailEdit,
    handlePasswordEdit,
    windowWidth,
    userData,
  } = useProfileForm(confirmation, setConfirmation, user);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex justify-center flex-col'
    >
      <div className='flex flex-col justify-center items-center gap-2 md:absolute left-1/2 -top-24 md:-translate-x-1/2 '>
        <label htmlFor='avatar'>
          <img
            src={
              preview ||
              process.env.NEXT_PUBLIC_API_URL + '/storage/' + userData?.avatar
            }
            alt='pfp'
            className='w-44 h-44 object-cover rounded-full cursor-pointer'
          />
        </label>
        <input {...register('avatar')} type='file' hidden id='avatar' />
        <label htmlFor='profileimg' className='text-white text-xl'>
          Upload new photo
        </label>
      </div>
      <div className='flex items-center flex-col gap-12 md:mt-0 mt-10'>
        <div className='flex flex-col w-full max-w-md gap-2'>
          <label className='text-base text-white'>Username</label>
          <div className='flex items-center gap-4 relative'>
            <input
              disabled
              value={userData.username}
              className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
              type='text'
            />
            <p
              onClick={() => {
                setUsernameActive((prev) => !prev);
              }}
              className='text-gray-300 cursor-pointer text-xl md:static absolute right-0 '
            >
              Edit
            </p>
          </div>
        </div>
        {usernameActive && (
          <>
            {windowWidth && windowWidth >= 768 ? (
              <div className='hidden md:flex flex-col w-full max-w-md gap-2'>
                <label className='text-base text-white'>New username</label>
                <div className='flex items-center gap-4 relative'>
                  <input
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
                    type='text'
                  />
                  <p className='text-xl select-none text-transparent'>Edit</p>
                  <p className='absolute -bottom-8 text-red-600 text-xl'>
                    <ErrorMessage errors={errors} name='username' />
                  </p>
                </div>
              </div>
            ) : (
              <div className='md:hidden absolute top-0 h-full w-full lowres-profile-modal z-40'>
                <div className='bg-navbar flex flex-col gap-2 px-8 py-20'>
                  <label className='text-base text-white'>New username</label>
                  <div className='relative'>
                    <input
                      {...register('username', {
                        required: 'Username is required',
                      })}
                      className='md:hidden w-full px-4 py-2 outline-none border-none bg-gray-300  rounded-md text-black text-xl'
                      type='text'
                    />
                    <p className='text-xl -bottom-10 absolute  text-red-500'>
                      <ErrorMessage name='username' errors={errors} />
                    </p>
                  </div>
                </div>
                <div className='p-8 flex w-full items-center justify-between'>
                  <p
                    onClick={() => {
                      setEmailActive(false);
                      setPasswordActive(false);
                      setUsernameActive(false);
                      setPreview(undefined);
                      reset();
                    }}
                    className='cursor-pointer text-xl text-gray-300'
                  >
                    Cancel
                  </p>
                  <button
                    type='button'
                    className='disabled:bg-red-700 rounded-4 px-4 py-2 bg-red-600 text-white'
                    onClick={() => handleUsernameEdit()}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <div className='flex flex-col w-full max-w-md gap-2'>
          <label className='text-base text-white'>Email</label>
          <div className='flex items-center gap-4 relative'>
            <input
              value={userData.email}
              disabled
              className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
              type='text'
            />
            <p
              onClick={() => setEmailActive((prev) => !prev)}
              className='text-gray-300 cursor-pointer text-xl md:static absolute right-0 '
            >
              Edit
            </p>
          </div>
        </div>
        {emailActive && (
          <>
            {windowWidth && windowWidth >= 768 ? (
              <div className='hidden md:flex flex-col w-full max-w-md gap-2'>
                <label className='text-base text-white'>New email</label>
                <div className='flex items-center gap-4 relative'>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Invalid email address',
                      },
                    })}
                    className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
                    type='text'
                  />
                  <p className='text-xl select-none text-transparent'>Edit</p>
                  <p className='absolute -bottom-8 text-red-600 text-xl'>
                    <ErrorMessage errors={errors} name='email' />
                  </p>
                </div>
              </div>
            ) : (
              <div className='md:hidden absolute top-0 h-full w-full lowres-profile-modal z-40'>
                <div className='bg-navbar flex flex-col gap-2 px-8 py-20'>
                  <label className='text-base text-white'>New Email</label>
                  <div className='relative'>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Invalid email address',
                        },
                      })}
                      className='w-full px-4 py-2 outline-none border-none bg-gray-300  rounded-md text-black text-xl'
                      type='text'
                    />
                    <p className='text-xl -bottom-10 absolute  text-red-500'>
                      <ErrorMessage name='email' errors={errors} />
                    </p>
                  </div>
                </div>
                <div className='p-8 flex w-full items-center justify-between'>
                  <p
                    onClick={() => {
                      setEmailActive(false);
                      setPasswordActive(false);
                      setUsernameActive(false);
                      setPreview(undefined);
                      reset();
                    }}
                    className='cursor-pointer text-xl text-gray-300'
                  >
                    Cancel
                  </p>
                  <button
                    type='button'
                    className='disabled:bg-red-700 rounded-4 px-4 py-2 bg-red-600 text-white'
                    onClick={() => handleEmailEdit()}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {!userData.google_id && (
          <div className='flex flex-col w-full max-w-md gap-2'>
            <label className='text-base text-white'>Password</label>
            <div className='flex items-center gap-4 relative'>
              <input
                disabled
                value='password'
                className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
                type='password'
              />
              <p
                onClick={() => setPasswordActive((prev) => !prev)}
                className='text-gray-300 cursor-pointer text-xl md:static absolute right-0 '
              >
                Edit
              </p>
            </div>
          </div>
        )}

        {passwordActive && !userData?.google_id && (
          <>
            {windowWidth && windowWidth >= 768 ? (
              <>
                <div className='hidden md:flex gap-4 w-full max-w-md'>
                  <div className='border border-search p-6 w-full rounded-md'>
                    <p className='text-white text-base'>
                      Password shoud contain:
                    </p>
                    <ul className='list-disc list-inside mt-4'>
                      <li className={showLengthError(password)}>
                        8 or more characters
                      </li>
                      <li className={showLowercaseError(password, errors)}>
                        15 lowercase characters
                      </li>
                    </ul>
                  </div>
                  <p className='text-xl select-none text-transparent'>Edit</p>
                </div>
                <div className='hidden md:flex flex-col w-full max-w-md gap-2'>
                  <label className='text-base text-white'>New Password</label>
                  <div className='flex items-center gap-4 relative'>
                    <input
                      {...register('password', {
                        validate: validatePassword,
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                      className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
                      type='password'
                    />
                    <p className='text-xl select-none text-transparent'>Edit</p>
                  </div>
                </div>
                <div className='hidden md:flex flex-col w-full max-w-md gap-2'>
                  <label className='text-base text-white'>
                    Confirm password
                  </label>
                  <div className='flex items-center gap-4 relative'>
                    <input
                      {...register('password_confirmation', {
                        validate: (value: string) =>
                          value == password || 'Passwords do not match',
                      })}
                      className='w-full md:px-4 pr-9 md:py-2 py-3 outline-none border-b text-gray-300 border-search md:border-none bg-transparent md:bg-gray-300  rounded-md md:text-black text-xl'
                      type='password'
                    />
                    <p className='text-xl select-none text-transparent'>Edit</p>
                    <p className='absolute -bottom-8 text-red-600 text-xl'>
                      <ErrorMessage
                        errors={errors}
                        name='password_confirmation'
                      />
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className='md:hidden absolute top-0 h-full w-full lowres-profile-modal z-40'>
                <div className='bg-navbar flex flex-col gap-10 px-8 py-20'>
                  <div>
                    <label className='text-base text-white'>New Password</label>
                    <div className='relative'>
                      <input
                        {...register('password', {
                          required: 'Password is required',
                        })}
                        className='w-full px-4 py-2 outline-none border-none bg-gray-300  rounded-md text-black text-xl'
                        type='password'
                      />
                      <p className='text-xl -bottom-8 absolute  text-red-500'>
                        <ErrorMessage name='password' errors={errors} />
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className='text-base text-white'>
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <input
                        {...register('password_confirmation', {
                          validate: (value: string) =>
                            value == password || 'Passwords do not match',
                        })}
                        className='w-full px-4 py-2 outline-none border-none bg-gray-300  rounded-md text-black text-xl'
                        type='password'
                      />
                      <p className='text-xl -bottom-8 absolute  text-red-500'>
                        <ErrorMessage
                          name='password_confirmation'
                          errors={errors}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-8 flex w-full items-center justify-between'>
                  <p
                    onClick={() => {
                      setEmailActive(false);
                      setPasswordActive(false);
                      setUsernameActive(false);
                      setPreview(undefined);
                      reset();
                    }}
                    className='cursor-pointer text-xl text-gray-300'
                  >
                    Cancel
                  </p>
                  <button
                    type='button'
                    className='disabled:bg-red-700 rounded-4 px-4 py-2 bg-red-600 text-white'
                    onClick={() => handlePasswordEdit()}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {passwordActive || usernameActive || emailActive || preview ? (
        <div className='hidden absolute items-center gap-6 -bottom-14 md:flex w-full max-w-5xl justify-end mt-16'>
          <p
            onClick={() => {
              setEmailActive(false);
              setPasswordActive(false);
              setUsernameActive(false);
              setPreview(undefined);
              reset();
            }}
            className='cursor-pointer text-xl text-gray-300'
          >
            Cancel
          </p>
          <button
            type='submit'
            className='disabled:bg-red-700 rounded-4 px-4 py-2 bg-red-600 text-white'
          >
            Save changes
          </button>
        </div>
      ) : null}
      {confirmation && (
        <>
          <div className='md:hidden px-7 z-50 absolute left-0 top-0 w-full h-full bg-default'>
            <div className='absolute px-7 top-16 w-full left-0'>
              <div className='w-full border-b border-search flex-col pt-16  flex items-center justify-center rounded-r-none text-white'>
                <div className='flex items-center justify-center w-full pt-16 rounded-t-md pb-12 bg-navbar'>
                  <p className='text-base'>Are you sure to make changes?</p>
                </div>
              </div>
              <div className='px-5 py-4 bg-navbar rounded-b-md flex items-center justify-between'>
                <p
                  onClick={() => {
                    setConfirmation(false);
                    setPreview(undefined);
                  }}
                  className='text-gray-300 cursor-pointer'
                >
                  Cancel
                </p>
                <button
                  onClick={() => console.log('zd')}
                  type='submit'
                  className='disabled:bg-red-700 rounded-4 px-4 py-2 bg-red-600 text-white'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};
export default ProfileForm;