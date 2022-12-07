import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivites,
  getActivities,
} from "../../features/activity/activityActions";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import Success from "../Success/Success";
import cl from "./Actives.module.scss";

const Activites = () => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.activites);
  useEffect(() => {
    dispatch(fetchActivites());
  }, [dispatch]);
  const submitForm = () => {
    dispatch(fetchActivites(state)).then(() => dispatch(getActivities()));
  };
  const [state, setState] = useState({
    activites_add: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { handleSubmit } = useForm();

  return (
    <form
      className={cl.companies__category}
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className={cl.companies__title}>Добавить источник дохода:</h2>
      <input
        className={cl.companies__input}
        type="text"
        onChange={handleInput}
        name="activites_add"
        required
      />
      {success && <Success>Данные были успешно отправлены</Success>}
      {loading && <Loading>Загрузка...</Loading>}
      {error && <Success>Данные не были отправлены</Success>}
      <Button>Submit</Button>
    </form>
  );
};

export default Activites;
