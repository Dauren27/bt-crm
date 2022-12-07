import { Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import {
  fetchConversations,
  getConversations,
} from "../../../features/conversations/conversationsActions";
import cl from "./conversations.module.scss";

const ConversationsContent = () => {
  //-----------API---------------------
  const [value, setValue] = useState(true);
  function changeValue() {
    setValue(!value);
    setState({ ...state, is_meeting: value });
    console.log(value);
  }
  const [state, setState] = useState({
    is_meeting: value,
    name: "",
    date: "",
    time: "",
    desc: "",
    results_report: null,
    statistics: null,
  });
  const { loading, success, error } = useSelector(
    (state) => state.conversations
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = () => {
    dispatch(fetchConversations(state)).then(() =>
      dispatch(getConversations())
    );
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Form
      className={cl.conversations}
      name="basic"
      autoComplete="off"
      onFinish={submitForm}
      onFinishFailed={() => alert("Заполните все поля")}
    >
      {/* <div className={cl.conversations__checkboxes}>
        <label>
          <span>Телефонный разговор</span>
          <input
            type="radio"
            name="radio"
            value="0"
            checked={value == "0" ? true : false}
            onChange={(e) => changeValue(e)}
          />
        </label>
        <label>
          <span>Очный разговор</span>
          <input
            type="radio"
            name="radio"
            value="1"
            checked={value == "1" ? true : false}
            onChange={(e) => changeValue(e)}
          />
        </label>
      </div> */}
      <div className={cl.conversations__checkbox}>
        <h2 className={cl.conversations__title}>Личная встреча: </h2>
        <input
          type="checkbox"
          className={cl.conversations__checkox}
          onChange={async (e) => {
            setState({
              ...state,
              is_meeting: e.target.checked,
            });
            console.log(e.target.checked);
          }}
        />
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>ФИО специалиста: </h2>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.conversations__input}
            name="name"
            onChange={handleInput}
            maxLength="100"
          />
        </Form.Item>
        {error && error.name && <Error>{error.name}</Error>}
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>Дата: </h2>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.conversations__input}
            name="date"
            onChange={handleInput}
            maxLength="30"
          />
        </Form.Item>
        {error && error.date && <Error>{error.date}</Error>}
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>Время: </h2>
        <Form.Item
          name="time"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.conversations__input}
            name="time"
            onChange={handleInput}
            maxLength="30"
          />
        </Form.Item>
        {error && error.time && <Error>{error.time}</Error>}
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>Тема разговора: </h2>
        <Form.Item
          name="desc"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <textarea
            className={cl.conversations__textarea}
            name="desc"
            onChange={handleInput}
            maxLength="200"
          ></textarea>
        </Form.Item>
        {error && error.desc && <Error>{error.desc}</Error>}
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>Отчёт по результатам: </h2>
        <Form.Item
          name="results_report"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <input
            className={cl.conversations__file}
            type="file"
            name="results_report"
            onChange={async (e) => {
              setState({
                ...state,
                results_report: e.target.files[0],
              });
            }}
          />
        </Form.Item>
        {error && error.results_report && <Error>{error.results_report}</Error>}
      </div>
      <div className={cl.conversations__category}>
        <h2 className={cl.conversations__title}>Статистика: </h2>
        <Form.Item
          name="statisctics"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <input
            type="file"
            className={cl.conversations__file}
            name="statistics"
            onChange={(e) => {
              setState({
                ...state,
                statistics: e.target.files[0],
              });
            }}
          />
        </Form.Item>
        {error && error.statistics && <Error>{error.statistics}</Error>}
      </div>
      {loading && <Loading>Отправка...</Loading>}
      {error && (
        <Error style={{ fontSize: "20px" }}>
          Данные не были отправлены. Проверьте корректность заполненых данных.
        </Error>
      )}
      {success && <Success>Данные успешно отправлены.</Success>}
      <Button>Submit</Button>
    </Form>
  );
};

export default ConversationsContent;
