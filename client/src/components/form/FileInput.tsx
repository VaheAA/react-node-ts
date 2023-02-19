import { useState } from 'react';
import close from '../../assets/img/close.svg';


interface IFileInput {
  name: string;
  label: string;
  register: any;
  errors: any;
  helperText: string;
  onClear: () => void;
  callback: (file: File | null) => void;
}


const FileInput: React.FC<IFileInput> = ({ name, label, register, errors, callback, onClear, helperText }) => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      callback(e.target.files[0]);
    }

  };

  const clearFile = () => {
    setFile(null);
    onClear();
  };

  return (
    <div className="file">
      <div className="file-wrapper">
        <label className="file-label" htmlFor={name}>{label}</label>
        <input id={name} {...register(name)} defaultValue={null} className="file-input" type="file" onChange={uploadFile} accept=".png, .jpeg, .jpg, .pdf, .doc, .docx, .mp3, .mp4" />
        {file && !errors[name] && <span className="file-success">{helperText}</span>}
        {file && <button type="button" className='file-delete' onClick={clearFile}>
          <img src={close} alt="" />
        </button>}
      </div>
      {errors[name] && <span className="form__error">{errors[name].message}</span>}
    </div>
  );
};

export default FileInput;