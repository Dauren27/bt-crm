import { Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import {
  getConversations,
  patchConversation,
} from "../../../features/conversations/conversationsActions";
import cl from "../ConversationsAdd/conversations.module.scss";
import Layout from "../../../Layout/Layout";
import { useNavigate } from "react-router";

const ConversationIdPage = () => {
  //----API-----
  const [value, setValue] = useState(false);
  function changeValue(e) {
    setValue(e.target.value);
  }
  const { patchLoading, patchSuccess, patchError, conversationInfo } =
    useSelector((state) => state.conversations);
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const submitForm = () => {
    dispatch(patchConversation({ id: conversationInfo.id, obj: state })).then(
      () => dispatch(getConversations())
    );
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!conversationInfo) navigate("/conversations");
  }, []);
  //-------------------------------------------
  return (
    <Layout>
      {conversationInfo && (
        <Form
          className={cl.conversations}
          name="basic"
          autoComplete="off"
          onFinish={submitForm}
          onFinishFailed={() => alert("Заполните все поля")}
        >
          <h2 className={cl.title}>
            {conversationInfo.id}.{conversationInfo.name}
          </h2>
          <div className={cl.conversations__checkbox}>
            <h2 className={cl.conversations__title}>Личная встреча: </h2>
            <input
              type="checkbox"
              className={cl.conversations__checkox}
              defaultChecked={conversationInfo.is_meeting}
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
            <Input
              className={cl.conversations__input}
              name="name"
              defaultValue={conversationInfo.name}
              onChange={handleInput}
              maxLength="100"
            />
            {patchError && patchError.name && <Error>{patchError.name}</Error>}
          </div>
          <div className={cl.conversations__category}>
            <h2 className={cl.conversations__title}>Дата: </h2>
            <Input
              className={cl.conversations__input}
              name="date"
              defaultValue={conversationInfo.name}
              onChange={handleInput}
              maxLength="30"
            />
            {patchError && patchError.date && <Error>{patchError.date}</Error>}
          </div>
          <div className={cl.conversations__category}>
            <h2 className={cl.conversations__title}>Время: </h2>
            <Input
              className={cl.conversations__input}
              name="time"
              defaultValue={conversationInfo.name}
              onChange={handleInput}
              maxLength="30"
            />
            {patchError && patchError.time && <Error>{patchError.time}</Error>}
          </div>
          <div className={cl.conversations__category}>
            <h2 className={cl.conversations__title}>Тема разговора: </h2>
            <textarea
              className={cl.conversations__textarea}
              name="desc"
              defaultValue={conversationInfo.name}
              onChange={handleInput}
              maxLength="200"
            ></textarea>
            {patchError && patchError.desc && <Error>{patchError.desc}</Error>}
          </div>
          <div className={cl.conversations__category}>
            <h2 className={cl.conversations__title}>Отчёт по результатам: </h2>
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
            <p className={cl.file__name}>
              Текущий файл :{" "}
              <a href={conversationInfo.results_report}>
                {conversationInfo.results_report}
              </a>
            </p>
            {patchError && patchError.results_report && (
              <Error>{patchError.results_report}</Error>
            )}
          </div>
          <div className={cl.conversations__category}>
            <h2 className={cl.conversations__title}>Статистика: </h2>
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
            <p className={cl.file__name}>
              Текущий файл :{" "}
              <a href={conversationInfo.statistics}>
                {conversationInfo.statistics}
              </a>
            </p>
            {patchError && patchError.statistics && (
              <Error>{patchError.statistics}</Error>
            )}
          </div>
          {patchLoading && <Loading>Отправка...</Loading>}
          {patchError && (
            <Error style={{ fontSize: "20px" }}>
              Данные не были отправлены. Проверьте корректность заполненых
              данных.
            </Error>
          )}
          {patchSuccess && <Success>Данные успешно изменены.</Success>}
          <Button>Сохранить</Button>
        </Form>
      )}
    </Layout>
  );
};

export default ConversationIdPage;
