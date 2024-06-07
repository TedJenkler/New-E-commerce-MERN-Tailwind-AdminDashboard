import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './app/store'
import { Provider } from 'react-redux'
import ProductPage from './components/ProductPage';
import Nav from './components/Nav';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Nav />
      <RouterProvider router={router} />
      <Footer />
    </Provider>
  </React.StrictMode>
);
