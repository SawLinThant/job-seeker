import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { cn } from '@/utils/cn';

const RSelect = ({
  name,
  type,
  placeholder,
  label,
  array,
  selectedText,
  required,
  validate,
  className,
  disabled,
  isStar
}: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message;
  return (
    <div className={cn('w-full', className)}>
      <label id={name} className="block mb-1 text-sm text-[#344054]">
        {label}

        {
                   isStar &&<span className="text-red-600">*</span>

        }
      </label>
      <select
        className={cn(
          'bg-white border border-gray-300  text-sm rounded-md focus:ring-0  block w-full p-[8px]  focus:outline-none text-gray-500',
          disabled && 'pointer-events-none opacity-30'
        )}
        {...register(name, { required: required, validate: validate })}
      >
        <option value="">{selectedText}</option>

        {array.map((_: any, i: any) => (
          <option value={_.value} key={i}>
            {_.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage text={error as string} />}
    </div>
  );
};

export default RSelect;
