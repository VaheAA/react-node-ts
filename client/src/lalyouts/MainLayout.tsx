import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainFooter from '../components/shared/MainFooter';
import MainHeader from '../components/shared/MainHeader';
import i18n from '../i18n';

const MainLayout: React.FC = () => {


  // Extract the language from the URL path
  const lang = window.location.pathname.split('/')[1];

  // Set the language in the i18n configuration
  i18n.changeLanguage(lang);

  return (
    <>
      <MainHeader />
      <main className="wrapper">
        <Outlet />
      </main>
      <MainFooter />
    </>
  );
};

export default MainLayout;