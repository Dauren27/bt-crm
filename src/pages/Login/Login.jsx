import classNames from "classnames";
import React from "react";
import cl from "./Login.module.scss";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/user/userActions";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submitForm = (data) => {
    dispatch(userLogin(data));
    navigate("/documents");
  };
  return (
    <div className={cl.login}>
      <form
        className={classNames(cl.login__form, "row")}
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className={cl.login__title}>Вход</h1>
        <div className={cl.login__row}>
          <h4 className={cl.title}>Логин:</h4>
          <input
            type="email"
            className={cl.input}
            {...register("email")}
            required
          />
        </div>
        <div className={cl.login__row}>
          <h4 className={cl.title}>Пароль:</h4>
          <input
            type="password"
            className={cl.input}
            {...register("password")}
            required
          />
        </div>
        <div className={cl.link} style={{ marginTop: "10px" }}>
          <NavLink to="/registration">Регистрация</NavLink>
        </div>
        {loading && <Loading>Загрузка...</Loading>}
        {error &&
          (error.response.data ? (
            Object.keys(error.response.data).map((item) => (
              <Error style={{ fontSize: "24px" }}>
                {error.response.data[item]}
              </Error>
            ))
          ) : (
            <Error>{error.message}</Error>
          ))}
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Login;
