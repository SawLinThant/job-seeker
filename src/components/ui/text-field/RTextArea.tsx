import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { cn } from '@/utils/cn';

const RTextArea: React.FC<any> = ({
  name,
  type,
  placeholder,
  label,
  required,
  validate,
  className,
  isStar,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message;
  return (
    <div className={cn('w-full', className)}>
      <label id={name} className="block mb-1 text-sm text-gray-500">
        {label}
           {
                   isStar &&<span className="text-red-600">*</span>

        }
      </label>
      <div className="w-full">
        <textarea
          rows={4}
          type={type}
          placeholder={placeholder}
          {...register(name, { required: required, validate: validate })}
          {...rest}
          className="w-full px-2 py-2 text-sm border rounded-md focus:outline-none focus:ring-0"
        />
        {error && <ErrorMessage text={error as string} />}
      </div>
    </div>
  );
};

export default RTextArea;
