import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from './pages/Chat';

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

