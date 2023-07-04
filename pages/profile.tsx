import { Navbar, Sidebar } from '@/components';
import { useProfile } from '@/hooks/useProfile';
import { ErrorMessage } from '@hookform/error-message';

const Profile = () => {
  const {
    emailActive,
    passwordActive,
    setEmailActive,
    setPasswordActive,
    setSidebarActive,
    setUsernameActive,
    sidebarActive,
    usernameActive,
    handleSubmit,
    onSubmit,
    validatePassword,
    errors,
    showLengthError,
    showLowercaseError,
    register,
    password,
    reset,
  } = useProfile();
  console.log(errors);
  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen py-24 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='profile'
        />
        <div className='mt-6 w-full'>
          <h2 className='text-white text-2xl mt-4'>My profile</h2>
          <div className='w-full flex items-center justify-center h-full'>
            <section className='w-full flex items-center justify-center'>
              <div className='py-36 bg-sidebar max-w-5xl relative w-full px-4 flex flex-col items-center justify-center'>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='w-full flex justify-center flex-col'
                >
                  <div className='flex flex-col justify-center items-center gap-2 absolute left-1/2 -top-24 -translate-x-1/2 '>
                    <label htmlFor="avatar">
                    <img
                      src='/assets/images/default-pfp.png'
                      alt='pfp'
                      className='w-44 h-44 object-cover rounded-full cursor-pointer'
                      />
                    </label>
                    <input {...register('avatar')} type='file' hidden id='avatar' />
                    <label htmlFor='profileimg' className='text-white text-xl'>
                      Upload new photo
                    </label>
                  </div>
                  <div className='flex items-center flex-col gap-12'>
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Username</label>
                      <div className='flex items-center gap-4'>
                        <input
                          disabled
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='text'
                        />
                        <p
                          onClick={() => {
                            setUsernameActive((prev) => !prev);
                          }}
                          className='text-gray-300 cursor-pointer text-xl'
                        >
                          Edit
                        </p>
                      </div>
                    </div>
                    {usernameActive && (
                      <div className='flex flex-col w-full max-w-md gap-2'>
                        <label className='text-base text-white'>
                          New username
                        </label>
                        <div className='flex items-center gap-4 relative'>
                          <input
                            {...register('username', {
                              required: 'Username is required',
                            })}
                            className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                            type='text'
                          />
                          <p className='text-xl select-none text-transparent'>
                            Edit
                          </p>
                          <p className='absolute -bottom-8 text-red-600 text-xl'><ErrorMessage errors={errors} name='username'/></p>
                        </div>
                      </div>
                    )}
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Email</label>
                      <div className='flex items-center gap-4'>
                        <input
                          disabled
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='text'
                        />
                        <p
                          onClick={() => setEmailActive((prev) => !prev)}
                          className='text-gray-300 cursor-pointer text-xl'
                        >
                          Edit
                        </p>
                      </div>
                    </div>
                    {emailActive && (
                      <div className='flex flex-col w-full max-w-md gap-2'>
                        <label className='text-base text-white'>
                          New email
                        </label>
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
                            className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                            type='text'
                          />
                          <p className='text-xl select-none text-transparent'>
                            Edit
                          </p>
                          <p className='absolute -bottom-8 text-red-600 text-xl'><ErrorMessage errors={errors} name='email'/></p>
                        </div>
                      </div>
                    )}
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Password</label>
                      <div className='flex items-center gap-4'>
                        <input
                          disabled
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='password'
                        />
                        <p
                          onClick={() => setPasswordActive((prev) => !prev)}
                          className='text-gray-300 cursor-pointer text-xl'
                        >
                          Edit
                        </p>
                      </div>
                    </div>
                    {passwordActive && (
                      <>
                        <div className='flex gap-4 w-full max-w-md'>
                          <div className='border border-search p-6 w-full rounded-md'>
                            <p className='text-white text-base'>
                              Password shoud contain:
                            </p>
                            <ul className='list-disc list-inside mt-4'>
                              <li className={showLengthError()}>
                                8 or more characters
                              </li>
                              <li className={showLowercaseError()}>
                                15 lowercase characters
                              </li>
                            </ul>
                          </div>
                          <p className='text-xl select-none text-transparent'>
                            Edit
                          </p>
                        </div>
                        <div className='flex flex-col w-full max-w-md gap-2'>
                          <label className='text-base text-white'>
                            New Password
                          </label>
                          <div className='flex items-center gap-4 relative'>
                            <input
                              {...register('password', {
                                validate: validatePassword,
                                minLength: {
                                  value: 8,
                                  message:
                                    'Password must be at least 8 characters',
                                },
                              })}
                              className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                              type='password'
                            />
                            <p className='text-xl select-none text-transparent'>
                              Edit
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-col w-full max-w-md gap-2'>
                          <label className='text-base text-white'>
                            Confirm password
                          </label>
                          <div className='flex items-center gap-4 relative'>
                            <input
                              {...register('password_confirmation', {
                                validate: (value: string) =>
                                  value == password || 'Passwords do not match',
                              })}
                              className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                              type='password'
                            />
                            <p className='text-xl select-none text-transparent'>
                              Edit
                            </p>
                          <p className='absolute -bottom-8 text-red-600 text-xl'><ErrorMessage errors={errors} name='password_confirmation'/></p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='absolute items-center gap-6 -bottom-14 flex w-full max-w-5xl justify-end mt-16'>
                    <p
                      onClick={() => {
                        setEmailActive(false);
                        setPasswordActive(false);
                        setUsernameActive(false);
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
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
