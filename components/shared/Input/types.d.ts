import { InputHTMLAttributes } from 'react';
import { FieldValues } from 'react-hook-form';
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  name: string;
  validation?: object;
  lowercase?: boolean;
}
