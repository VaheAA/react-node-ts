import { Outlet } from 'react-router-dom';
import MainHeader from '../components/shared/MainHeader';
const AuthLayout: React.FC = () => {
  return (
    <>
      <MainHeader />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;