import React, { useContext, useEffect } from "react";
import cl from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../context";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../features/user/userActions";
import { logout } from "../../features/user/userSlice";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const clickHandler = () => {
    setSidebarOpen(false);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className={`${cl.sidebar} ${sidebarOpen && cl.sidebar__open}`}>
        <div className={cl.sidebar__dashboard}>
          <h1>Dashboard</h1>
        </div>
        {sidebarOpen && (
          <CloseOutlined
            className={sidebarOpen && cl.sidebar__closeBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}
        <div className={cl.sidebar__menu}>
          <h2 className={cl.sidebar__menu__title}>MY STORE</h2>
          <ul className={cl.sidebar__menu__links}>
            <li>
              <NavLink
                exact
                to="/documents"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Документы на КК</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/companies"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Компании</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/counterparties"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>ЧП/ИП</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/recipients"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Поручители</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/conversations"
                className={({ isActive }) => (isActive ? cl.active : "")}
                onClick={() => clickHandler()}
              >
                <span>Переговоры</span>
              </NavLink>
            </li>
            <li>
              <a onClick={() => dispatch(logout())}>Выйти</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
