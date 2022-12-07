import { Form, Input } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import {
  fetchProperties,
  getProperties,
} from "../../../features/property/propertyActions";
import cl from "./Property.module.scss";

const PropertyContent = () => {
  const [state, setState] = useState({
    type: "",
    address: "",
    files: null,
    images: null,
  });
  const dispatch = useDispatch();
  const submitForm = () => {
    dispatch(fetchProperties(state)).then((response) =>
      dispatch(getProperties())
    );
  };
  const { loading, error, success } = useSelector((state) => state.property);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Form
      className={cl.mortgagedProperty}
      name="basic"
      autoComplete="off"
      onFinish={submitForm}
      onFinishFailed={() => alert("Заполните все поля")}
    >
      <div className={cl.mortgagedProperty__category}>
        <h2 className={cl.mortgagedProperty__title}>Залоговое имущество</h2>
        <Form.Item
          name="text"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            type="text"
            className={cl.mortgagedProperty__input}
            name="type"
            onChange={handleInput}
          />
        </Form.Item>
      </div>
      <div className={cl.mortgagedProperty__category}>
        <h2 className={cl.mortgagedProperty__title}>Местонахождение залога</h2>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            type="text"
            className={cl.mortgagedProperty__input}
            name="address"
            onChange={handleInput}
          />
        </Form.Item>
      </div>
      <div className={cl.mortgagedProperty__category}>
        <h2 className={cl.mortgagedProperty__title}>
          Документы на залоговое имущество
        </h2>
        <Form.Item
          name="files"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <input
            type="file"
            onChange={(e) =>
              setState({
                ...state,
                files: e.target.files[0],
              })
            }
          />
        </Form.Item>
      </div>
      <div className={cl.mortgagedProperty__category}>
        <h2 className={cl.mortgagedProperty__title}>
          Фотографии залогового имущество
        </h2>
        <Form.Item
          name="images"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <input
            type="file"
            onChange={(e) =>
              setState({
                ...state,
                images: e.target.files[0],
              })
            }
          />
        </Form.Item>
      </div>
      {loading && <Loading>Отправка...</Loading>}
      {error &&
        Object.keys(error).map((item) => (
          <Error style={{ fontSize: "20px" }}>{item}</Error>
        ))}
      {success && <Success>Данные успешно отправлены.</Success>}
      <Button>Submit</Button>
    </Form>
  );
};

export default PropertyContent;
