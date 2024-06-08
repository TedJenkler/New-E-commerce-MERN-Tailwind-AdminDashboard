import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { store } from './app/store';
import { Provider } from 'react-redux';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import Homepage from './components/Homepage';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Homepage /></Layout>,
  },
  {
    path: "/product/:id",
    element: <Layout><ProductPage /></Layout>,
  },
  {
    path: "/:id",
    element: <Layout><CategoryPage /></Layout>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);