import React, { useEffect, useState } from "react";
import cl from "../style.module.scss";
import Button from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuarantors,
  patchGuarantor,
} from "../../features/guarantors/guarantorsActions";
import { Select, Form, Input } from "antd";
import Error from "../UI/Error/Error";
import Success from "../UI/Success/Success";
import Loading from "../UI/Loading/Loading";
import { useNavigate } from "react-router";

const RecipientIdPageContent = ({ isModal = false, handleCancelFour }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patchLoading, patchSuccess, patchError, recipientInfo } = useSelector(
    (state) => state.guarantor
  );
  useEffect(() => {
    if (!recipientInfo) navigate("/recipients");
  }, []);
  const [state, setState] = useState({
    full_name: recipientInfo && recipientInfo.full_name,
    address: recipientInfo && recipientInfo.address,
    actual_address: recipientInfo && recipientInfo.actual_address,
    status: recipientInfo && recipientInfo.status,
    phone: recipientInfo && recipientInfo.phone,
  });
  const submitForm = () => {
    dispatch(patchGuarantor({ id: recipientInfo.id, obj: state })).then(() => {
      dispatch(getGuarantors());
    });
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    recipientInfo &&
      setState({
        full_name: recipientInfo.full_name,
        address: recipientInfo.address,
        actual_address: recipientInfo.actual_address,
        status: recipientInfo.status,
        phone: recipientInfo.phone,
      });
  }, [recipientInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/recipients");
    if (isModal && patchSuccess) handleCancelFour();
  }, [patchSuccess]);
  //-------------------------------------------
  return (
    <div className={cl.content}>
      {recipientInfo && (
        <div>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {recipientInfo.id}.{recipientInfo.full_name}
            </h2>
            <div className={cl.content__content}>
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>ФИО залогодателя:</h2>
                <Input
                  className={cl.content__input}
                  type="text"
                  name="full_name"
                  maxLength="100"
                  value={state.full_name}
                  onChange={handleInput}
                />
                {patchError && patchError.full_name && (
                  <Error>{patchError.full_name}</Error>
                )}
              </div>
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Семейное положение:</h2>
                <Select
                  className={cl.content__accor}
                  onChange={(e) => setState({ ...state, status: e })}
                  value={state.status}
                >
                  <Select.Option value="married">Женат/Замужем</Select.Option>
                  <Select.Option value="divorced">Разведен</Select.Option>
                  <Select.Option value="widow/widower">
                    Вдова/Вдовец
                  </Select.Option>
                  <Select.Option value="single">Холост/Незамужем</Select.Option>
                </Select>
                {patchError && patchError.status && (
                  <Error>{patchError.status}</Error>
                )}
              </div>

              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Кредитная история:</h2>
                <input
                  type="file"
                  onChange={(e) => {
                    setState({
                      ...state,
                      credit_history: e.target.files[0],
                    });
                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={recipientInfo.credit_history}>
                    {recipientInfo.credit_history}
                  </a>
                </p>
                {patchError && patchError.credit_history && (
                  <Error>{patchError.credit_history}</Error>
                )}
              </div>
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Номер телефона:</h2>
                <Input
                  className={cl.content__input}
                  type="text"
                  name="phone"
                  value={state.phone}
                  onChange={handleInput}
                  maxLength="30"
                />
                {patchError && patchError.phone && (
                  <Error>{patchError.phone}</Error>
                )}
              </div>

              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Адрес прописки:</h2>
                <Input
                  className={cl.content__input}
                  type="text"
                  name="address"
                  value={state.address}
                  onChange={handleInput}
                  maxLength="100"
                />
                {patchError && patchError.address && (
                  <Error>{patchError.address}</Error>
                )}
              </div>

              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Адрес фактический:</h2>
                <Input
                  className={cl.content__input}
                  type="text"
                  value={state.actual_address}
                  name="actual_address"
                  onChange={handleInput}
                  maxLength="100"
                />
                {patchError && patchError.actual_address && (
                  <Error>{patchError.actual_address}</Error>
                )}
              </div>

              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Справка о доходах:</h2>
                <input
                  type="file"
                  onChange={(e) => {
                    setState({
                      ...state,
                      income_statement: e.target.files[0],
                    });
                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={recipientInfo.income_statement}>
                    {recipientInfo.income_statement}
                  </a>
                </p>
                {patchError && patchError.income_statement && (
                  <Error>{patchError.income_statement}</Error>
                )}
              </div>
            </div>
            {patchLoading && <Loading>Отправка...</Loading>}
            {patchError && (
              <Error style={{ fontSize: "20px" }}>
                Данные не были отправлены. Проверьте корректность заполненых
                данных.
              </Error>
            )}
            {patchSuccess && <Success>Данные успешно изменены.</Success>}

            <Button disabled={patchLoading}>Сохранить</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default RecipientIdPageContent;
