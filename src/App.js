import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes/routes";
import { SidebarContext } from "./context";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./features/user/userActions";
import { getEntities } from "./features/entity/entityActions";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    let fourMinutes = 1000 * 600 * 4;
    let interval = setInterval(() => {
      dispatch(updateToken());
    }, fourMinutes);
  }, []);
  return (
    <>
      <BrowserRouter>
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
          {isAuth ? (
            <PrivateRoutes />
          ) : (
            <PublicRoutes />
          )}
        </SidebarContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
