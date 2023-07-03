import { ChangeEvent, RefObject, forwardRef } from 'react';

type InputProps = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default ({ label, type = 'text', value, onChange }: InputProps) => {
  return (
    <div className='flex justify-between px-4 py-2 bg-purple-200 rounded-tl-xl rounded-br-xl'>
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label}
        className='w-2/3'
      />
    </div>
  );
};
