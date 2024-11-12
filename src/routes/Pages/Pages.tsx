import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import { IRoutes } from '../types';
import RequireAuth from './RequireAuth';
import { routes } from '..';

function Pages() {
  const listRoutes = useMemo(() => {
    const result: IRoutes[] = [];
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].subMenus && routes[i].subMenus.length > 0) {
        for (let j = 0; j < routes[i].subMenus.length; j++) {
          result.push(routes[i].subMenus[j]);
        }
      } else {
        result.push(routes[i]);
      }
    }
    return result;
  }, [routes]);

  return (
    <>
      <Routes>
        {listRoutes.map(({ path, privateRoute, subMenus, permission, component: Component }, i) => {
          return (
            <Route
              key={i}
              path={path}
              element={
                privateRoute ? (
                  <RequireAuth permission={permission || ''}>
                    <Component />
                  </RequireAuth>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default Pages;
