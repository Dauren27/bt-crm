import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import { Form, Input } from "antd";
import Button from "../../../components/Button/Button";
import { patchProperty } from "../../../features/property/propertyActions";
import cl from "../PropertyAdd/Property.module.scss";
import { useNavigate } from "react-router";

const PropertyIdPageContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patchLoading, patchSuccess, patchError, propertyInfo } = useSelector(
    (state) => state.property
  );
  const [state, setState] = useState({});
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchProperty({ id: propertyInfo.id, obj: state }));
  };
  useEffect(() => {
    if (!propertyInfo) navigate("/properties");
  }, []);
  useEffect(() => {
    if (patchSuccess) navigate("/properties");
  }, [patchSuccess]);
  return (
    <div>
      {propertyInfo && (
        <Form
          className={cl.mortgagedProperty}
          name="basic"
          autoComplete="off"
          onFinish={submitForm}
          onFinishFailed={() => alert("Заполните все поля")}
        >
          <h2 className={cl.title}>
            {propertyInfo.id}.{propertyInfo.type}
          </h2>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>Залоговое имущество</h2>
            <Input
              type="text"
              className={cl.mortgagedProperty__input}
              name="type"
              defaultValue={propertyInfo.type}
              onChange={handleInput}
            />
            {patchError && patchError.type && <Error>{patchError.type}</Error>}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Местонахождение залога
            </h2>
            <Input
              type="text"
              className={cl.mortgagedProperty__input}
              name="address"
              defaultValue={propertyInfo.address}
              onChange={handleInput}
            />
            {patchError && patchError.address && (
              <Error>{patchError.address}</Error>
            )}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Документы на залоговое имущество
            </h2>
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  files: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              Текущий файл :{" "}
              <a href={propertyInfo.files[0].file}>{propertyInfo.files[0].file}</a>
            </p>
            {patchError && patchError.files && (
              <Error>{patchError.files}</Error>
            )}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Фотографии залогового имущество
            </h2>
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  images: e.target.files[0],
                })
              }
            />
            <p className={cl.file__name}>
              Текущий файл :{" "}
              <a href={propertyInfo.images[0].image}>{propertyInfo.images[0].image}</a>
            </p>
            {patchError && patchError.images && (
              <Error>{patchError.images}</Error>
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
          <Button>Отправить</Button>
        </Form>
      )}
    </div>
  );
};

export default PropertyIdPageContent;
