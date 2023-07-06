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

export interface User {
  avatar: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  id: string;
  google_id: string;
}

export interface ProfileFormProps {
  user: User;
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  confirmation: boolean;
}
