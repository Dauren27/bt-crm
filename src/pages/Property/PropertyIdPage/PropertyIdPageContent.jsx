import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import { Form, Input } from "antd";
import Button from "../../../components/Button/Button";
import {
  getProperties,
  getProperty,
  patchProperty,
} from "../../../features/property/propertyActions";
import cl from "../PropertyAdd/Property.module.scss";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";

const PropertyIdPageContent = ({
  isModal = false,
  handleCancelFive = false,
  handleCancelSix = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patchLoading, patchSuccess, patchError, propertyInfo } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    if (!propertyInfo) navigate("/properties");
  }, []);
  const [state, setState] = useState({
    type: propertyInfo && propertyInfo.type,
    address: propertyInfo && propertyInfo.address,
    imagesArray: propertyInfo && [...propertyInfo.images],
    filesArray: propertyInfo && [...propertyInfo.files],
  });
  const [imageFiles, setImageFiles] = useState(
    propertyInfo && propertyInfo.images.length
  );
  const [fileFiles, setFileFiles] = useState(
    propertyInfo && propertyInfo.files.length
  );
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchProperty({ id: propertyInfo.id, obj: state })).then(() => {
      dispatch(getProperties());
    });
  };
  useEffect(() => {
    propertyInfo &&
      setState({
        ...state,
        type: propertyInfo && propertyInfo.type,
        address: propertyInfo && propertyInfo.address,
      });
  }, [propertyInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/properties");
    if (isModal && patchSuccess) {
      handleCancelFive && handleCancelFive();
      handleCancelSix && handleCancelSix();
    }
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
            <h2 className={cl.mortgagedProperty__title}>
              Залоговое имущество:
            </h2>
            <Input
              type="text"
              className={cl.mortgagedProperty__input}
              name="type"
              value={state.type}
              onChange={handleInput}
            />
            {patchError && patchError.type && <Error>{patchError.type}</Error>}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Местонахождение залога:
            </h2>
            <Input
              type="text"
              className={cl.mortgagedProperty__input}
              name="address"
              value={state.address}
              onChange={handleInput}
            />
            {patchError && patchError.address && (
              <Error>{patchError.address}</Error>
            )}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Документы на залоговое имущество:
            </h2>
            {propertyInfo.files.map((item, index) => (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    state.filesArray[index] = e.target.files[0];
                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={propertyInfo.files[index].file}>
                    {propertyInfo.files[index].file}
                  </a>
                </p>
              </>
            ))}
            {[...Array(fileFiles - propertyInfo.files.length)].map((item) => (
              <input
                className={cl.mortgagedProperty__additionalFiles}
                type="file"
                onChange={(e) => {
                  state.filesArray.push(e.target.files[0]);
                }}
              />
            ))}
            {fileFiles != 5 && (
              <div
                className={cl.mortgagedProperty__addFiles}
                onClick={() => setFileFiles(fileFiles + 1)}
              >
                <BsPlusLg /> <span>Add another file</span>
              </div>
            )}
            {patchError && patchError.files && (
              <Error>{patchError.files}</Error>
            )}
          </div>
          <div className={cl.mortgagedProperty__category}>
            <h2 className={cl.mortgagedProperty__title}>
              Фотографии залогового имущество:
            </h2>
            {propertyInfo.images.map((item, index) => (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    state.imagesArray[index] = e.target.files[0];

                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={propertyInfo.images[index].image}>
                    {propertyInfo.images[index].image}
                  </a>
                </p>
              </>
            ))}
            {[...Array(imageFiles - propertyInfo.images.length)].map((item) => (
              <input
                className={cl.mortgagedProperty__additionalFiles}
                type="file"
                onChange={(e) => {
                  state.imagesArray.push(e.target.files[0]);
                }}
              />
            ))}
            {imageFiles != 5 && (
              <div
                className={cl.mortgagedProperty__addFiles}
                onClick={() => setImageFiles(imageFiles + 1)}
              >
                <BsPlusLg /> <span>Add another image</span>
              </div>
            )}
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
          <Button>Сохранить</Button>
        </Form>
      )}
    </div>
  );
};

export default PropertyIdPageContent;
