import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from '../Header/Header';
import { AppDispatch } from '../store/store';
import readCurrentUser from '../../api/directus/user/readCurrentUser';
import Agenda from '../Agenda/Agenda';
import Setting from '../Setting/Setting';
import ListUser from '../Listuser/ListUser';
import Admin from '../Admin/Admin';
import Home from '../Login/Login';
import BadResolution from './BadResolution';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    dispatch(readCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    // Media queries to detect device type (mobile/tablet vs desktop)
    const isMobileOrTablet = window.matchMedia('(max-width: 1024px)').matches;
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

    const handleOrientationChange = () => {
      if (isMobileOrTablet) {
        setIsLandscape(false); // On mobile/tablet, landscape will be false
      } else if (isDesktop) {
        // On desktop, landscape will depend on orientation
        const isLandscapeMode = window.matchMedia('(orientation: landscape)').matches;
        setIsLandscape(!isLandscapeMode);
      }
    };

    // Initially check the orientation and device size
    handleOrientationChange();

    // Listen for orientation or screen size changes
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Check if the user is already connected
    const isConnected = Cookies.get('isConnected');
    if (!isConnected) {
      navigate('/login');
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [dispatch, navigate]);

  return (
    <div className="bg-[#EAEAEA] h-screen">
      {isLandscape && <BadResolution />}
      {!isLandscape && (
        <>
          {location.pathname !== '/' && location.pathname !== '/login' && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="agenda" element={<Agenda />}>
              <Route path=":parcAgenda" element={<Agenda />} />
            </Route>
            <Route path="parametres" element={<Setting />}>
              <Route path=":menuSetting" element={<Setting />} />
            </Route>
            <Route path="liste-utlisateur" element={<ListUser />} />
            <Route path="administration" element={<Admin />}>
              <Route path=":menuAdmin" element={<Admin />} />
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
