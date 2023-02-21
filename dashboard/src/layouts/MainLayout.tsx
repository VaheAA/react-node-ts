import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/shared/MainHeader';
import { useUserStore } from '../store/userStore';
const MainLayout: React.FC = () => {

  const checkLogin = useUserStore(state => state.checkLogin);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <MainHeader />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;