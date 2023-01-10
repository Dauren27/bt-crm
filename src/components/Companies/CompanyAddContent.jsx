import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import cl from "../style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import { Modal } from "antd";
import { Select, Form, Input } from "antd";
import Activites from "../Actives/Actives";
import {
  fetchCompany,
  getCompanies,
} from "../../features/company/companyActions";
import { getActivities } from "../../features/activity/activityActions";
import Error from "../UI/Error/Error";
import Loading from "../UI/Loading/Loading";
import Success from "../UI/Success/Success";

const CompaniesContent = ({ isModal = false }) => {
  //----API-----
  const dispatch = useDispatch();
  const { push } = useRouter();
  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(getActivities());
  }, [dispatch]);
  const { error, loading, company, success, successModal } = useSelector(
    (state) => state.companies
  );
  const submitForm = () => {
    if (isModal) {
      dispatch(fetchCompany(state)).then(() => dispatch(getCompanies()));
    } else {
      dispatch(fetchCompany(state));
    }
  };

  const { activities } = useSelector((state) => state.activites);
  const [state, setState] = useState({
    company_name: "",
    inn: "",
    legal_address: "",
    actual_address: "",
    telephone: "",
    okpo: "",
    register_number: "",
    field_activity: null,
    document: null,
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!isModal) if (success) push("/companies");
  }, [success]);
  const reversed = (arr) => {
    const arr2 = [...arr];
    arr2.reverse();
    return arr2;
  };
  //-------------------------------------------

  //---Modals----------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //-------------------------------------------

  return (
    <div className={cl.content}>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Наименование компании:</h2>
          <Form.Item
            name="company_name"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="company_name"
              maxLength="100"
            />
          </Form.Item>
          {error && error.company_name && <Error>{error.company_name}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>ИНН Компании:</h2>
          <Form.Item
            name="inn"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="inn"
              maxLength="14"
            />
          </Form.Item>
          {error && error.inn && <Error>{error.inn}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Юридический адрес:</h2>
          <Form.Item
            name="legal_address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="legal_address"
              maxLength="100"
            />
          </Form.Item>
          {error && error.legal_address && <Error>{error.legal_address}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Фактический адрес:</h2>
          <Form.Item
            name="actual_address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="actual_address"
              maxLength="100"
            />
          </Form.Item>
          {error && error.actual_address && (
            <Error>{error.actual_address}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Номер телефона:</h2>
          <Form.Item
            name="telephone"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              defaultValue="+996"
              onChange={handleInput}
              name="telephone"
              maxLength="30"
            />
          </Form.Item>
          {error && error.legal_address && <Error>{error.legal_address}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Сфера деятельности:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="activites_add"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, field_activity: e });
                }}
                className={cl.content__accor}
                fieldNames={{ label: "activites_add", value: "id" }}
                filterOption={(input, option) =>
                  (option?.activites_add.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={activities && reversed(activities)}
              />
            </Form.Item>
            {error && error.activites_add && (
              <Error>{error.activites_add}</Error>
            )}
            <BsPlusLg className={cl.add__svg} onClick={showModal} />
          </div>
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Окпо:</h2>
          <Form.Item
            name="okpo"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="okpo"
              maxLength="8"
            />
          </Form.Item>
          {error && error.okpo && <Error>{error.okpo}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Регистрационный номер:</h2>
          <Form.Item
            name="register_number"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="register_number"
              maxLength="30"
            />
          </Form.Item>
          {error && error.register_number && (
            <Error>{error.register_number}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Документ компании: </h2>
          <Form.Item
            name="document"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              className={cl.content__file}
              name="document"
              onChange={(e) => {
                setState({
                  ...state,
                  document: e.target.files[0],
                });
              }}
            />
          </Form.Item>
          {error && error.document && <Error>{error.document}</Error>}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {successModal && <Success>Данные успешно отправлены.</Success>}
        <Button>Отправить</Button>
      </Form>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Activites />
      </Modal>
    </div>
  );
};

export default CompaniesContent;
