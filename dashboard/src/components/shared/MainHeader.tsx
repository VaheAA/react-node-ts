import { Link } from 'react-router-dom';
import logo from '../../assets/img/team_logo.png';
import MainNavigation from './MainNavigation';

const MainHeader: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="logo" to="/">
            <img src={logo} />
          </Link>
          <MainNavigation />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;