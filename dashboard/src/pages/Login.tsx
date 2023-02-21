import { useForm } from 'react-hook-form';
import { userLoginSchema, UserLoginType } from '../shared/schema/userSchema';
import { useUserStore } from '../store/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadinSpinner';


const Login: React.FC = () => {

  const login = useUserStore(state => state.login);
  const isLoading = useUserStore(state => state.isLoading);
  const error = useUserStore(state => state.error);
  const navigate = useNavigate();

  const { handleSubmit, register, reset, formState: { errors } } = useForm<UserLoginType>({
    mode: 'onSubmit',
    resolver: zodResolver(userLoginSchema)
  });

  const submitHandler = async (values: UserLoginType) => {
    await login(values);
    reset();

    if (!isLoading && !error) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth">
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="auth__inner">
          <form className="auth__form" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input {...register('email')} className="form-input" id="email" type="email" placeholder='Enter your email' />
              {errors.email && <span className='form-error'>{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input {...register('password')} className="form-input" id="password" type="password" placeholder='Enter your password' />
              {errors.password && <span className='form-error'>{errors.password.message}</span>}
            </div>
            <div className="form-group">
              <button className="btn btn-submit">Login</button>
            </div>
            {error && <span className='form-error'>{error.data.msg}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;