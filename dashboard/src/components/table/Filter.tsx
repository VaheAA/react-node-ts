import { useForm } from 'react-hook-form';
import Input from '../field/Input';
import { useReportStore } from '../../store/reportStore';



const fields = ["id", "name", "email", "phone", "status", "category", "period", "witness"];
type FilterFieldName = "id" | "name" | "email" | "phone" | "status" | "category" | "period" | "witness";

const Filter: React.FC = () => {

  const getMessages = useReportStore(state => state.getMessages);

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      status: '',
      category: '',
      period: '',
      witness: '',
    }
  });

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as FilterFieldName;
    setValue(fieldName, e.target.value, { shouldDirty: true });
  };


  const submitHandler = (values: any) => {

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        if (value === null || value === undefined || value === '') {
          delete values[key];
        }
      }
    }

    getMessages(1, 15, values);
  };

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="filter-fields">
          {fields.map((field, idx) => (
            <div className="filter-group" key={idx}>
              <Input onChange={onFieldChange} name={field} type="text" label={field} placeholder={field} key={idx} register={register} />
            </div>
          ))}
        </div>
        <button className="btn btn-filter" style={{ marginTop: 'auto' }}>Search</button>
      </form>
    </div>
  );
};

export default Filter;