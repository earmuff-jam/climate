import { createBrowserRouter } from 'react-router-dom';
import Inventories from '../Containers/Inventory/Inventories';
import ProfileDetails from '../Containers/Profile/ProfileDetails';
import Layout from './Layout';
import Plan from '../Components/Maintenance/Plan';
import EditInventory from '../Containers/Inventory/EditInventory';

/**
 * Authorized routes are available here. Due to the nature of the logged in state of authentication from supabase, after the user logs in, we redirect
 * them to the / page. This page is unfortunately blank, hence we have children route as / as well. This enables us to load children route in the
 * <Outlet />. By doing this, we are loading the Inventories component after the user signs in.
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Inventories displayAllInventories={false} />,
      },
      {
        path: '/inventories/list',
        element: <Inventories displayAllInventories={true} />,
      },
      {
        path: '/inventories/:id/update',
        element: <EditInventory />,
      },
      {
        path: '/inventories/maintenance/list',
        element: <Plan />,
      },
      {
        path: '/profile',
        element: <ProfileDetails />,
      },
    ],
  },
]);
