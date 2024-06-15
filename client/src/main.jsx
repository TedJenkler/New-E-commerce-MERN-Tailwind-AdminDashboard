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
import Checkout from './components/Checkout';
import Blur from './components/Blur';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PPfNkP7UvQT87QE68NIZvrMqWqZleH2fi2zG5y1Sh5sTz24MhhC3ULZitXA6sqdN9e6JpDpsQObBsr26iyH9rhx00Evd4LB0n');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Blur><Homepage /></Blur></Layout>,
  },
  {
    path: "/product/:id",
    element: <Layout><Blur><ProductPage /></Blur></Layout>,
  },
  {
    path: "/:id",
    element: <Layout><Blur><CategoryPage /></Blur></Layout>,
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);