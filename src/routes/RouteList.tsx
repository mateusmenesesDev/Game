import { useRoutes } from 'react-router-dom';
import { Detail } from '../pages/Detail/Detail';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

export function RouteList() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/detail/:gameId', element: <Detail /> },
    { path: '*', element: <NotFound /> },
  ]);
}
