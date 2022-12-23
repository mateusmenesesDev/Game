import { useRoutes } from 'react-router';
import { Detail } from '../pages/Detail';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
export function RouteList() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: 'detalhes/:gameName', element: <Detail /> },
    { path: '*', element: <NotFound /> },
  ]);
}
