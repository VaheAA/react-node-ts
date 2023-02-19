import { RegisterOptions } from 'react-hook-form';

type SelectOption = {
  value: string;
  title?: string;
};

interface ISelect {
  options: SelectOption[];
  defaultValue: string;
  label: string;
  name: string;
  register: any;
  errors: any;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ISelect> = ({ options, label, name, register, errors, onChange, ...props }) => {
  return (
    <div>
      <label className="form__label" htmlFor={name}>{label}</label>
      <select className='form__list' {...register(name)} onChange={onChange} {...props} >
        <option disabled value="" >{options[0].value}</option>
        {options.slice(1).map(option => <option key={option.value} value={option.value} title={option.title}>{option.value}</option>)}
      </select>
      {errors[name] && <span className="form__error">{errors[name].message}</span>}
    </div>
  );
};

export default Select;