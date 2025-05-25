import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Restaurant from './pages/Restaurant';
import ProtectedRoute from './components/ProtectedRouted';
import ChatRest from './pages/ChatRest';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Prato from './pages/Dish';
import RestEdit from './pages/RestEdit';
import { Toaster } from './components/ui/toaster';

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
    path: "/chatRest/:id",
    element: (
      <ProtectedRoute>
        <ChatRest/>
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
  },
  {
    path: "/dish/:id",
    element: (
      <ProtectedRoute>
        <Prato/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <Register/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/restedit/:id",
    element: (
      <ProtectedRoute>
        <RestEdit/>
      </ProtectedRoute>
    ),
  }
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
      <Toaster/>
    </Provider>
  )
}

export default App;

