import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes/routes";
import { SidebarContext } from "./context";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./features/user/userActions";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateToken());
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <BrowserRouter>
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
          {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
        </SidebarContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
