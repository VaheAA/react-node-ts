import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';


const MainNavigation: React.FC = () => {
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const logout = useUserStore(state => state.logout);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isLoggedIn && (
          <>
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link btn" to="/settings">Settings</Link>
            </li>
          </>
        )}
        {!isLoggedIn && <li className="header__nav-item">
          <Link className="header__nav-link btn" to="/login">Login</Link>
        </li>}
        {isLoggedIn && <li className="header__nav-item">
          <button className="header__nav-link btn" onClick={logout} type="button">Logout</button>
        </li>}
      </ul>
    </nav>
  );
};

export default MainNavigation;