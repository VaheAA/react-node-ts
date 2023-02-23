import React from 'react';

interface IInputProps {
  name: string;
  placeholder: string;
  label: string;
  register: any;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({ name, placeholder, label, register, type, onChange }) => {
  return (
    <>
      <label className='form-label' htmlFor={name}>{label}</label>
      <input {...register(name)} id={name} className="form-input form-input-filter" type={type} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

export default Input;