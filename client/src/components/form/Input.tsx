interface IInputProps {
  name: string;
  placeholder: string;
  label: string;
  register: any;
  errors: any;
  type?: string;
  textarea?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({ name, placeholder, label, register, errors, type, textarea = false, onChange }) => {
  return (
    <>
      <label className='form__label' htmlFor={name}>{label}</label>
      {textarea ?
        <textarea className="form__input form__input-message" id={name} {...register(name)} placeholder={placeholder} /> :
        <input {...register(name)} id={name} className="form__input" type={type} placeholder={placeholder} onChange={onChange} />}
      {errors[name] && <span className="form__error">{errors[name].message}</span>}
    </>
  );
};

export default Input;