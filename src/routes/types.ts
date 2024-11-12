import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: any;
  privateRoute?: boolean;
  onSidebar?: boolean;
  permission?: string;
  subMenus?: ISubmenu[];
};

type ISubmenu = {
  title?: string;
  component: FC;
  icon?: any;
  privateRoute?: boolean;
  path: string;
  onSidebar?: boolean;
  permission?: string;
} & PathRouteProps;
type IRoutes = PathRouteProps & PathRouteCustomProps;

export type { IRoutes };
