import { Suspense, lazy } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MAINLayout from '../layouts';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={
        <Grid sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
          <CircularProgress />
        </Grid>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MAINLayout />,
      children: [
        {
          path: '/',
          children: [
            { path: '/', element: <Navigate to="/all" replace /> },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> }
          ]
        }
      ]
    },

    // Main Routes

    { path: '*', element: <NotFound /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication

const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));

// Main

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
