import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import { Detail } from '../pages/Detail';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
export function RouteList() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: 'detail/:gameName', element: <Detail /> },
    { path: '*', element: <NotFound /> },
  ]);
}
