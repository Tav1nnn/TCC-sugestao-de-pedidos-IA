import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Restaurant from './pages/Restaurant';
import ProtectedRoute from './components/ProtectedRouted';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/restaurant/:id",
    element: (
      <ProtectedRoute>
        <Restaurant/>
      </ProtectedRoute>
    ),
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

