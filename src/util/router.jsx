import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import Layout from "./Layout";

const Forecast = lazy(() => import('../Containers/Forecast/Forecast'));
const CategoriesList = lazy(() => import('../Components/CategoryDetails/CategoriesList'));
const EditInventory = lazy(() => import('../Containers/Inventory/EditInventory'));
const Inventories = lazy(() => import('../Containers/Inventory/Inventories'));
const ProfileDetails = lazy(() => import('../Containers/Profile/ProfileDetails'));
const Plan = lazy(() => import('../Components/Maintenance/Plan'));
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
        element: <Inventories displayAllInventories={false} hideActionMenu={true} />,
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
        path: '/inventories/forecast/list',
        element: <Forecast />,
      },
      {
        path: '/inventories/maintenance/list',
        element: <Plan />,
      },
      {
        path: '/inventories/categories/list',
        element: <CategoriesList />,
      },
      {
        path: '/profile',
        element: <ProfileDetails />,
      },
    ],
  },
]);
