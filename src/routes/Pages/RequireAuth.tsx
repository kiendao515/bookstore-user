import { useLocation, useNavigate } from 'react-router-dom';

import { useUser } from '@/api/auth';
import { PermissionEnum } from '@/utils/enum/permission.enum';

function RequireAuth({ children, permission }: { children: JSX.Element; permission: string }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  if (!user?.data || !user?.data?.permissions?.includes(permission) || 
  (location.pathname.includes('admin') && !user?.data?.permissions.includes(PermissionEnum.USER_ADMIN))
  || (!location.pathname.includes('admin') && user?.data?.permissions.includes(PermissionEnum.USER_ADMIN))
  ) {
    if (location.pathname.includes('admin')) {
      navigate('/admin/login');
    } else {
      navigate('/login');
    }
  }
  return children;
}

export default RequireAuth;
