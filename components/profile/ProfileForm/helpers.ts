import { ErrorType } from './types';

export const showLengthError = (password: string) => {
  if (password?.length > 8) {
    return 'marker:text-green-300 text-white';
  } else {
    return 'text-gray-600';
  }
};

export const showLowercaseError = (password: string, errors: ErrorType) => {
  if (errors?.password?.type == 'validate' || !password) {
    return 'text-gray-600';
  } else if (password?.length >= 8) {
    return 'marker:text-green-300 text-white';
  } else {
    return 'text-gray-600';
  }
};
