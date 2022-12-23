import React, { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context";
import cl from "./Navbar.module.scss";
import { MdOutlineMenu } from "react-icons/md";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../features/user/userActions";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [list, setList] = useState("Документы на КК");
  useEffect(() => {
    if (
      location.pathname === "/documents" ||
      location.pathname === "/documents/add" ||
      location.pathname.includes("/documents/document/")
    ) {
      setList("Документы на КК");
    } else if (
      location.pathname === "/companies" ||
      location.pathname === "/companies/add" ||
      location.pathname.includes("/companies/company/")
    ) {
      setList("Компании");
    } else if (
      location.pathname === "/counterparties" ||
      location.pathname === "/counterparties/add" ||
      location.pathname.includes("/counterparties/client/") ||
      location.pathname.includes("/counterparties/entity/")
    ) {
      setList("ЧП/ИП");
    } else if (
      location.pathname === "/recipients" ||
      location.pathname === "/recipients/add" ||
      location.pathname.includes("/recipients/recipient/")
    ) {
      setList("Поручители");
    } else if (
      location.pathname === "/conversations" ||
      location.pathname === "/conversations/add" ||
      location.pathname.includes("/conversations/conversation/")
    ) {
      setList("Переговоры");
    } else if (
      location.pathname === "/properties" ||
      location.pathname === "/properties/add" ||
      location.pathname.includes("/properties/property/")
    ) {
      setList("Залоговые имущества");
    } else {
      setList("Документы на КК");
    }
    dispatch(getUserDetail());
  }, []);

  return (
    <div className={cl.navbar}>
      <h2 className={cl.navbar__left}>
        <MdOutlineMenu
          className={cl.navbar__burger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </h2>
      <h2 className={cl.navbar__right}>{list}</h2>
      <span>
        <h2 className={cl.navbar__role}>
          {userInfo && userInfo.fullname && userInfo.fullname}
        </h2>
      </span>
    </div>
  );
};

export default Navbar;
