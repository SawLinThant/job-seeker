import React from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { cn } from '@/utils/cn';
import { JapaneseYen } from 'lucide-react'

const RTextField: React.FC<{
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: string;
  validate?: any;
  isStar?: boolean;
  rightIcon?:boolean;
  maxLength?:number;
}> = ({ name, type, placeholder, label, required, validate, isStar,rightIcon,maxLength,...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message;
  return (
    <div className="w-full">
      <label id={name} className="block mb-1 text-sm text-[#344054]">
        {label} 
        {
          isStar &&<span className="text-red-600">*</span>
        }
                        

      </label>
      <div className={cn('flex items-center gap-3 border border-[#D0D5DD]   justify-between rounded-[5px] px-1 py-[0.3rem]',            error && 'border-error_b'
)}>

        <input
        maxLength={maxLength}
          type={type}
          autoComplete='off'
          placeholder={placeholder}
          {...register(name, { required: required, validate: validate })}
          {...rest}
          className={cn(
            'px-1 py-1 w-full outline-none text-sm focus:ring-none focus:border-none'
          )}
        />

{
  rightIcon &&  <div className="border-l border-l-[#D0D5DD] px-3  ">
                  <JapaneseYen width={18} height={18} color="#344054" />
                </div>
}
       
      
      </div>
        {error && <ErrorMessage text={error as string} />}
    </div>
  );
};

export default RTextField;
