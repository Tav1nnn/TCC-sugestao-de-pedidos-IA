import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Restaurant from './pages/Restaurant';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "chat",
    element: <Chat/>,
  },
  {
    path: "/restaurant/:id",
    element: <Restaurant/>,
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

