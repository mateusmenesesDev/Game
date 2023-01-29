import { useRoutes } from 'react-router-dom';
import BugReport from '../pages/BugReport/BugReport';
import { Detail } from '../pages/Detail/Detail';
import { Home } from '../pages/Home';
import { List } from '../pages/List/List';
import Login from '../pages/Login/Login';
import { NotFound } from '../pages/NotFound';

export function RouteList() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/detail/:gameId', element: <Detail /> },
    { path: '/list', element: <List /> },
    { path: '/login', element: <Login /> },
    { path: '/report', element: <BugReport /> },
    { path: '*', element: <NotFound /> },
  ]);
}
