import cl from "../RecipientsAdd/recipients.module.scss";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGuarantors,
  getGuarantors,
  patchGuarantor,
} from "../../../features/guarantors/guarantorsActions";
import { Select, Form, Input } from "antd";
import Error from "../../../components/Error/Error";
import Success from "../../../components/Success/Success";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router";

const RecipientIdPageContent = () => {
  //-----------API---------------------
  const dispatch = useDispatch();

  const { patchLoading, patchSuccess, patchError, recipientInfo } = useSelector(
    (state) => state.guarantor
  );
  const [state, setState] = useState({});
  const submitForm = () => {
    dispatch(patchGuarantor({ id: recipientInfo.id, obj: state })).then(() =>
      dispatch(getGuarantors())
    );
  };
  const navigate = useNavigate();
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!recipientInfo) navigate("/recipients");
  }, []);
  //-------------------------------------------
  return (
    <div>
      {recipientInfo && (
        <div>
          <Form
            className={cl.recipients__container}
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {recipientInfo.id}.{recipientInfo.full_name}
            </h2>
            <div className={cl.recipients__content}>
              <div className={cl.recipients__category}>
                <h2>ФИО залогодателя:</h2>
                <Input
                  className={cl.recipients__input}
                  type="text"
                  defaultValue={recipientInfo.full_name}
                  name="full_name"
                  onChange={handleInput}
                  maxLength="100"
                />
                {patchError && patchError.full_name && (
                  <Error>{patchError.full_name}</Error>
                )}
              </div>
              <div className={cl.recipients__category}>
                <h2>Семейное положение:</h2>
                <Select
                  className={cl.recipients__accor}
                  onChange={(e) => setState({ ...state, status: e })}
                  defaultValue={recipientInfo.status}
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

              <div className={cl.recipients__category}>
                <h2>Кредитная история:</h2>

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

              <div className={cl.recipients__category}>
                <h2>Номер телефона:</h2>
                <Input
                  className={cl.recipients__input}
                  type="text"
                  name="phone"
                  defaultValue={recipientInfo.phone}
                  onChange={handleInput}
                  maxLength="30"
                />
                {patchError && patchError.phone && (
                  <Error>{patchError.phone}</Error>
                )}
              </div>

              <div className={cl.recipients__category}>
                <h2>Адрес прописки:</h2>

                <Input
                  className={cl.recipients__input}
                  type="text"
                  name="address"
                  defaultValue={recipientInfo.address}
                  onChange={handleInput}
                  maxLength="100"
                />
                {patchError && patchError.address && (
                  <Error>{patchError.address}</Error>
                )}
              </div>

              <div className={cl.recipients__category}>
                <h2>Адрес фактический:</h2>
                <Input
                  className={cl.recipients__input}
                  type="text"
                  defaultValue={recipientInfo.actual_address}
                  name="actual_address"
                  onChange={handleInput}
                  maxLength="100"
                />
                {patchError && patchError.actual_address && (
                  <Error>{patchError.actual_address}</Error>
                )}
              </div>

              <div className={cl.recipients__category}>
                <h2>Справка о доходах:</h2>

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
            <Button>Сохранить</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default RecipientIdPageContent;
