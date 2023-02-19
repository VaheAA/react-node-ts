interface CheckboxProps {
  name: string;
  id: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Checkbox: React.FC<CheckboxProps> = ({ checked, name, id, onChange, label }) => {
  return (
    <div className="checkbox">
      <input className="checkbox__input" type="checkbox" name={name} id={id} checked={checked} onChange={onChange} />
      <label htmlFor={name} className="form__label checkbox__label">{label}</label>
    </div>
  );
};

export default Checkbox;