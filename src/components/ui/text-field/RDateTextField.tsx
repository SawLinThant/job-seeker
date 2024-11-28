import { CalendarIcon, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

const RDateTextField :React.FC<{name:string,validateMessage:string;label:string;width:boolean;minDate?:any;maxDate?:any;isStar?:boolean}> = ({name,validateMessage,label,width,minDate,maxDate,isStar
}) => {
      const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
  <div className='w-full'>

       <span className="block mb-1 text-sm text-[#344054]">{label} {isStar && <span className='text-red-600'>*</span>} </span>
              <Controller
                control={control}
                name={name}
                rules={{
                  required: {
                    value: true,
                    message: validateMessage,
                  },
                }}
                render={({ field, formState, fieldState }) => {
                  return (

                    <DesktopDatePicker

                    minDate={minDate}
                    maxDate={maxDate}
                      label="Select Date"
                      {...field}
                      slotProps={{
                        textField: {
                          size: "small",
                          variant:"outlined",
                          fullWidth:width
                        
                        },
                        field: {
                        readOnly: true
                    }
                      }}
                      slots={{
                        openPickerIcon: CalendarIcon,
                      }}
                      format="DD.MM.YYYY"
                    />

                  );
                }}
              />
  </div>)
}

export default RDateTextField