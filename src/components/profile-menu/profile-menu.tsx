import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { logoutUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login', { replace: true });
    } catch {}
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
