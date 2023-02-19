import React, { ReactNode } from 'react';

interface IToggleProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  children?: ReactNode;
}

const Toggle: React.FC<IToggleProps> = ({ id, checked, onChange, label, children }) => {
  return (
    <div className="toggle-wrapper">
      <label htmlFor="anon" className="form__label toggle">
        <input type="checkbox" name={id} id={id} className="toggle-checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
      <div className="toggle__info">
        <span className="toggle__title">{label}</span>
        {children}
      </div>
    </div>

  );
};

export default Toggle;