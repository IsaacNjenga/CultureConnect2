import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import ProtectedRoutes from "./components/protectedRoutes";
import About from "./pages/About";

export const UserContext = createContext(null);

axios.defaults.baseURL = "http://localhost:3001/CultureConnect/";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  { path: "/logout", element: <Logout /> },
  { path: "/about", element: <About /> },
  { path: "*", element: <NotFound /> },
]);
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("verify", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
