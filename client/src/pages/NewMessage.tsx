import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { newMessageSchema, NewMessageType } from '../shared/schema/newMessageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '../components/form/Checkbox';
import Select from '../components/form/Select';
import Toggle from '../components/form/Toggle';
import Input from '../components/form/Input';
import FileInput from '../components/form/FileInput';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import LoadingSpinner from '../components/shared/LoadingSpinner';

type FieldsState = {
  anon: boolean;
  date: boolean;
  witness: boolean;
};

type SelectOption = {
  value: string;
  title?: string;
};


const NewMessage: React.FC = () => {
  const [fieldsState, setFieldsState] = useState<FieldsState>({
    anon: false,
    date: false,
    witness: false
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();


  const { register, unregister, handleSubmit, reset, watch, setValue, clearErrors, formState: { errors } } = useForm<NewMessageType>({
    mode: 'onBlur',
    resolver: zodResolver(newMessageSchema),
    defaultValues: {
      file: null
    }
  });

  const { t } = useTranslation();

  const categorySelectOptions: SelectOption[] = t('messagePage.selects.categorySelect', { returnObjects: true });
  const statusSelectOptions: SelectOption[] = t('messagePage.selects.statusSelect', {
    returnObjects: true
  });
  const periodSelectOptions: SelectOption[] = t('messagePage.selects.periodSelect', { returnObjects: true });


  useEffect(() => {
    if (!localStorage.getItem('speakup-terms')) {
      navigate('/');
    }
  }, []);


  const periodChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('period', e.target.value);
    setValue('date', '');
    unregister('date');
  };

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('date', e.target.value);
    setValue('period', '');
    unregister('period');
  };

  const fieldStateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsState({
      ...fieldsState,
      [e.target.id]: e.target.checked,
    });

    clearErrors();

    if (!fieldsState.anon) {
      unregister('name');
      unregister('phone');
    }
    if (!fieldsState.date) {
      unregister('date');
      unregister('period');
    };
    if (!fieldsState.witness) {
      unregister('name');
    };
  };


  const handleFileChange = (file: File | null) => {
    setValue('file', file, { shouldValidate: true });
  };

  const handleFileClear = () => {
    setValue('file', null);
    clearErrors('file');
  };


  const submitHandler: SubmitHandler<NewMessageType> = async (values) => {
    try {
      setIsloading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('category', values.category);
      formData.append('status', values.status);
      formData.append('period', values.period);
      formData.append('date', values.date);
      formData.append('witness', values.witness);
      formData.append('message', values.message);
      formData.append('file', values.file);

      const res = await fetch('http://localhost:3000/api/message', {
        method: 'Post',
        headers: {
          'Accept-Language': i18next.language
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.msg, {
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
        reset();
        clearErrors();
        navigate('/');
        localStorage.removeItem('speakup-terms');
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="message">
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="message__inner">
          <h1 className="title">{t('messagePage.title')}</h1>
          <Link className='btn-back' to="/">{t('messagePage.btnBack')}</Link>
          <form className="form" id="form" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <Toggle id="anon" checked={fieldsState.anon} onChange={fieldStateHandler} label={`${t('messagePage.toggleTitle')}`}>
                <span className="hint">!
                  <span className="hint__text"> {t('messagePage.hintText')}</span>
                </span>
              </Toggle>
            </div>
            {!fieldsState.anon && (
              <div className="form-group">
                <Input name="name" type="text" placeholder={`${t('messagePage.inputs.nameInputPlaceholder')}`} label={`${t('messagePage.inputs.nameInputLabel')}`} register={register} errors={errors} />
              </div>
            )}
            <div className="form-group">
              <Input name="email" type="email" placeholder={`${t('messagePage.inputs.emailInputLabel')}`} label={`${t('messagePage.inputs.emailInputPlaceholder')}`} register={register} errors={errors} />
              {fieldsState.anon && <p className="form__contact-desc" dangerouslySetInnerHTML={{ __html: t('messagePage.contactDescription') }}></p>}
            </div>
            {!fieldsState.anon && <div className="form-group">
              <Input name="phone" type="text" placeholder={`${t('messagePage.inputs.phoneInputPlaceholder')}`} label={`${t('messagePage.inputs.phoneInputLabel')}`} register={register} errors={errors} />
            </div>}
            <div className="form-group">
              <Select options={categorySelectOptions} label={`${t('messagePage.inputs.categoryInputLabel')}`} defaultValue="" name="category" register={register} errors={errors} />
            </div>
            <div className="form-group">
              <Select options={statusSelectOptions} label={`${t('messagePage.inputs.statuInputLabel')}`} defaultValue="" name="status" register={register} errors={errors} />
            </div>
            <div className="form-group">
              <Checkbox name="date" id="date" checked={fieldsState.date} onChange={fieldStateHandler} label={`${t('messagePage.inputs.dateCheckboxLabel')}`} />
            </div>
            {fieldsState.date && <div className="form-group form-group--big">
              <Select options={periodSelectOptions} label={`${t('messagePage.inputs.periodSelectDesc')}`} defaultValue="" name="period" register={register} errors={errors} onChange={periodChangeHandler} />
              <Input name="date" type="date" placeholder={`${t('messagePage.inputs.dateSelectDesc')}`} label={`${t('messagePage.inputs.dateSelectDesc')}`} register={register} errors={errors} onChange={dateChangeHandler} />
            </div>}
            <div className="form-group">
              <Checkbox name="witness" id="witness" checked={fieldsState.witness} onChange={fieldStateHandler} label={`${t('messagePage.inputs.witnessCheckboxLabel')}`} />
            </div>
            {fieldsState.witness && <div className="form-group">
              <Input name="witness" type="text" placeholder={`${t('messagePage.inputs.witnessInputPlaceholder')}`} label={`${t('messagePage.inputs.witnessInputLabel')}`} register={register} errors={errors} />
            </div>}
            <div className="form-group">
              <Input textarea={true} name="message" placeholder={`${t('messagePage.inputs.messageInputPlaceholder')}`} label={`${t('messagePage.inputs.messageInputLabel')}`} register={register} errors={errors} />
            </div>
            <div className="form-group">
              <FileInput label={`${t('messagePage.inputs.fileInputLabel')}`} helperText={`${t('messagePage.inputs.fileInputHelperText')}`} name="file" register={register} callback={handleFileChange} onClear={handleFileClear} errors={errors} />
            </div>
            <input className="btn btn-submit" type="submit" name="submit" value={`${t('messagePage.inputs.submitButton')}`} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;;