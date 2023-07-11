import { UserType } from '@/types';
import { FieldErrors, FieldValues } from 'react-hook-form';

export interface ErrorType extends FieldErrors<FieldValues> {
  email?: {
    type: string;
    message: string;
  };
  password?: {
    type: string;
    message: string;
  };
}

export interface ProfileFormProps {
  user: UserType;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmation: boolean;
}
