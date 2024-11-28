import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { cn } from '@/utils/cn';

const RPasswordTextField: React.FC<{
  name: string;
  placeholder: string;
  label: string;
  required: string;
  validate?: any;
}> = ({ name, placeholder, label, required, validate, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<any>();
  const error = errors[name]?.message;
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="w-full">
      <label id={name} className="block mb-1 text-sm text-[#344054]">
        {label}
      </label>
      <div className="relative">
        <input
                  autoComplete='off'

          type={isShow ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name, {
            required: required,
            validate: validate,
            minLength: { value: 8, message: 'Minimum 8 characters required' },
          })}
          {...rest}
          className={cn(
            'w-full px-2 py-2 text-sm border rounded-md focus:outline-none focus:ring-0',

            error && 'border-error_b'
          )}
        />
        {error && <ErrorMessage text={error as string} />}
        <div
          className="absolute right-3 top-3 "
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {isShow ? <FiEye className="text-gray-500" /> : <FiEyeOff className="text-gray-500" />}
        </div>
      </div>
    </div>
  );
};

export default RPasswordTextField;
