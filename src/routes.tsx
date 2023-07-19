import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages';
import { SEO } from './components';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <SEO title="test" description="Testing the SEO component">
          <Home />
        </SEO>
      ),
    },
    {
      path: 'about',
      element: <div>About</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
