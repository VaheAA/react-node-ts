import { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/img/banner.png';
import { useTranslation } from 'react-i18next';
import Checkbox from '../components/form/Checkbox';


const Home: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  const changeHandler = (): void => {
    setIsChecked(prevState => !prevState);

    if (!localStorage.getItem('speakup-terms')) {
      localStorage.setItem('speakup-terms', 'true');
    }
  };

  const termsHandler = () => {
    if (!localStorage.getItem('speakup-terms')) {
      alert('Խնդրում ենք ընդունել պայմանները');
    }
  };


  return (
    <div className="home">
      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <div className="home__disclaimer">
              <p className="home__disclaimer-text" dangerouslySetInnerHTML={{ __html: t('homePage.disclaimer') }}>
              </p>
            </div>
            <div className="home__terms">
              <Checkbox name="terms" id="terms" checked={isChecked} onChange={changeHandler} label="Ես հասկանում և ընդունում եմ վերոնշյալ" />
            </div>
            {isChecked && <div className="home-btn">
              <Link onClick={termsHandler} className="btn" to={`/${i18n.language}/new-message`}>Թողնել հայտ</Link>
            </div>}
          </div>
          <div className="home__banner">
            <img src={banner} alt="Speak Up" />
            <h1 className="title">{t('homePage.title')}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;