import { useLocation, useNavigate } from 'react-router-dom';

import { useUserProfile } from '@/api/auth';
import { RoleEnum } from '@/utils/enum/role.enum';

function RequireAuth({ children, roles }: { children: JSX.Element, roles: string[] }) {
  const { user } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  if (roles.includes(RoleEnum.NONE)) return children

  if (!user?.result || !user?.data || !roles.includes(user?.data?.role)) {
    if (location.pathname.includes("/admin")) {
      navigate('/admin/login');
    } else {
      navigate('/');
    }
  }

  return children;
}

export default RequireAuth;
