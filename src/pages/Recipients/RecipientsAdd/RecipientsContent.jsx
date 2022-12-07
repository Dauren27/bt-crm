import cl from "./recipients.module.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGuarantors,
  getGuarantors,
} from "../../../features/guarantors/guarantorsActions";
import { Select, Form, Input } from "antd";
import Error from "../../../components/Error/Error";
import Success from "../../../components/Success/Success";
import Loading from "../../../components/Loading/Loading";

const RecipientsContent = () => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const submitForm = () => {
    dispatch(fetchGuarantors(state)).then(() => dispatch(getGuarantors()));
  };
  const [state, setState] = useState({
    full_name: "",
    status: "",
    credit_history: null,
    phone: "",
    address: "",
    actual_address: "",
    income_statement: null,
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { loading, success, error } = useSelector((state) => state.guarantor);
  //-------------------------------------------
  return (
    <div>
      <Form
        className={cl.recipients__container}
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.recipients__content}>
          <div className={cl.recipients__category}>
            <h2>ФИО залогодателя:</h2>
            <Form.Item
              name="full_name"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.recipients__input}
                type="text"
                name="full_name"
                onChange={handleInput}
                maxLength="100"
              />
            </Form.Item>
            {error && error.full_name && (
              <Error style={{ marginTop: "-20px" }}>{error.full_name}</Error>
            )}
          </div>
          <div className={cl.recipients__category}>
            <h2>Семейное положение:</h2>
            <Form.Item
              name="status"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.recipients__accor}
                onChange={(e) => setState({ ...state, status: e })}
              >
                <Select.Option value="married">Женат/Замужем</Select.Option>
                <Select.Option value="divorced">Разведен</Select.Option>
                <Select.Option value="widow/widower">
                  Вдова/Вдовец
                </Select.Option>
                <Select.Option value="single">Холост/Незамужем</Select.Option>
              </Select>
            </Form.Item>
            {error && error.status && <Error>{error.status}</Error>}
          </div>
          <div className={cl.recipients__category}>
            <h2>Кредитная история:</h2>
            <Form.Item
              name="credit_history"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) => {
                  setState({
                    ...state,
                    credit_history: e.target.files[0],
                  });
                }}
              />
            </Form.Item>
            {error && error.credit_history && (
              <Error style={{ marginTop: "-20px" }}>
                {error.credit_history}
              </Error>
            )}
          </div>
          <div className={cl.recipients__category}>
            <h2>Номер телефона:</h2>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.recipients__input}
                type="text"
                name="phone"
                onChange={handleInput}
                maxLength="30"
              />
            </Form.Item>
            {error && error.phone && (
              <Error style={{ marginTop: "-20px" }}>{error.phone}</Error>
            )}
          </div>
          <div className={cl.recipients__category}>
            <h2>Адрес прописки:</h2>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.recipients__input}
                type="text"
                name="address"
                onChange={handleInput}
                maxLength="100"
              />
            </Form.Item>
            {error && error.address && (
              <Error style={{ marginTop: "-20px" }}>{error.address}</Error>
            )}
          </div>
          <div className={cl.recipients__category}>
            <h2>Адрес фактический:</h2>
            <Form.Item
              name="actual_address"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.recipients__input}
                type="text"
                name="actual_address"
                onChange={handleInput}
                maxLength="100"
              />
            </Form.Item>
            {error && error.actual_address && (
              <Error style={{ marginTop: "-20px" }}>
                {error.actual_address}
              </Error>
            )}
          </div>
          <div className={cl.recipients__category}>
            <h2>Справка о доходах:</h2>
            <Form.Item
              name="income_statement"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) => {
                  setState({
                    ...state,
                    income_statement: e.target.files[0],
                  });
                }}
              />
            </Form.Item>
            {error && error.income_statement && (
              <Error>{error.income_statement}</Error>
            )}
          </div>
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
    </div>
  );
};

export default RecipientsContent;
