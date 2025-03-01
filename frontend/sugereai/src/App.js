import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home/>,
  }
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;

