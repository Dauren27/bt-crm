import { Form, Input } from "antd";
import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";

const PropertyContent = ({ isModal = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    type: "",
    address: "",
    filesArray: [],
    imagesArray: [],
  });
  const [imageFiles, setImageFiles] = useState(2);
  const [fileFiles, setFileFiles] = useState(2);
  const { loading, error, success, successModal } = useSelector(
    (state) => state.property
  );

  const submitForm = () => {
    if (isModal) {
      dispatch(fetchProperties(state)).then(() => dispatch(getProperties()));
    } else {
      dispatch(fetchProperties(state));
    }
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!isModal) if (success) navigate("/properties");
  }, [success]);
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
        {error && error.type && (
          <Error style={{ marginTop: "-20px" }}>{error.type}</Error>
        )}
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
        {error && error.address && (
          <Error style={{ marginTop: "-20px" }}>{error.address}</Error>
        )}
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
            onChange={(e) => state.filesArray.push(e.target.files[0])}
          />
        </Form.Item>
        {[...Array(fileFiles)].map((item) => (
          <input
            className={cl.mortgagedProperty__additionalFiles}
            type="file"
            onChange={(e) => {
              state.filesArray.push(e.target.files[0]);
            }}
          />
        ))}
        {fileFiles != 4 && (
          <div
            className={cl.mortgagedProperty__addFiles}
            onClick={() => setFileFiles(fileFiles + 1)}
          >
            <BsPlusLg /> <span>Add another file</span>
          </div>
        )}
        {error && error.files && (
          <Error style={{ marginTop: "-20px" }}>{error.files}</Error>
        )}
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
            onChange={(e) => {
              state.imagesArray.push(e.target.files[0]);
            }}
          />
        </Form.Item>
        {[...Array(imageFiles)].map((item) => (
          <input
            className={cl.mortgagedProperty__additionalFiles}
            type="file"
            onChange={(e) => {
              state.imagesArray.push(e.target.files[0]);
            }}
          />
        ))}
        {imageFiles != 4 && (
          <div
            className={cl.mortgagedProperty__addFiles}
            onClick={() => setImageFiles(imageFiles + 1)}
          >
            <BsPlusLg /> <span>Add another image</span>
          </div>
        )}
        {error && error.images && (
          <Error style={{ marginTop: "-20px" }}>{error.images}</Error>
        )}
      </div>
      {loading && <Loading>Отправка...</Loading>}
      {error && (
        <Error style={{ fontSize: "20px" }}>
          Данные не были отправлены. Проверьте корректность заполненых данных.
        </Error>
      )}
      {success && <Success>Данные успешно отправлены.</Success>}
      <Button>Отправить</Button>
    </Form>
  );
};

export default PropertyContent;
