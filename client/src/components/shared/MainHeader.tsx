import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/team_logo.png';
import CustomNavLink from './CustomNavLink';
import { useTranslation } from 'react-i18next';

const MainHeader: React.FC = () => {

  const { i18n } = useTranslation();
  const location = useLocation();


  const changeLanguage = (lang: string) => {
    const newPathname = location.pathname.replace(/^\/[a-z]{2}/, `/${lang}`);
    i18n.changeLanguage(lang);
    window.history.pushState(null, '', newPathname);
  };
  return (
    <header className="header">
      <div className="container container-header">
        <div className="header__inner">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="lang">
            <ul className="lang__list">
              <li className="lang__item">
                <CustomNavLink onClick={() => changeLanguage('hy')} to={`${location.pathname.replace(/^\/[a-z]{2}/, '/hy')}`} className="lang__link">Հայ</CustomNavLink>
              </li>
              <li className="lang__item">
                <CustomNavLink onClick={() => changeLanguage('ru')} to={`${location.pathname.replace(/^\/[a-z]{2}/, '/ru')}`} className="lang__link">Рус</CustomNavLink>              </li>
              <li className="lang__item">
                <CustomNavLink onClick={() => changeLanguage('en')} to={`${location.pathname.replace(/^\/[a-z]{2}/, '/en')}`} className="lang__link">Eng</CustomNavLink>              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;