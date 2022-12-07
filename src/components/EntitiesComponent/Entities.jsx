import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import cl from "../../pages/Counterparties/CounterpartiesAdd/counterparties.module.scss";
import { Modal } from "antd";
import { BsPlusLg } from "react-icons/bs";
import { getUserDetail } from "../../features/user/userActions";
import ConversationsContent from "../../pages/Conversations/ConversationsAdd/ConversationsContent";
import CompaniesContent from "../../pages/Companies/CompaniesAdd/CompaniesContent";
import Activites from "../Actives/Actives";
import { getCompanies } from "../../features/company/companyActions";
import { getConversations } from "../../features/conversations/conversationsActions";
import { getActivities } from "../../features/activity/activityActions";
import {
  fetchEntities,
  getEntities,
} from "../../features/entity/entityActions";
import { getProperties } from "../../features/property/propertyActions";
import PropertyContent from "../../pages/Property/PropertyAdd/PropertyContent";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import Success from "../Success/Success";

const EntitiesComponent = () => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  const { conversations } = useSelector((state) => state.conversations);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    token && dispatch(getUserDetail(token.access));
    dispatch(getCompanies());
    dispatch(getActivities());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const submitForm = () => {
    dispatch(fetchEntities(state)).then(() => dispatch(getEntities()));
  };
  const { companies } = useSelector((state) => state.companies);
  const { activities } = useSelector((state) => state.activites);
  const [state, setState] = useState({
    id_credit_spec: "",
    client_company: "",
    full_name_director: "",
    inn: "",
    credit_type: "",
    status: "",
    repaid_by_redemption: null,
    court_documents: null,
    credit_sum: "",
    phone: "",
    address: "",
    client_actual_address: "",
    average_salary: "",
    own_contribution: "",
    assets: "",
    current_loan: "",
    id_company: "",
    id_property: "",
    id_num_parley: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { loading, success, error } = useSelector((state) => state.entity);
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
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const showModalTwo = () => {
    setIsModalOpenTwo(true);
  };
  const handleOkTwo = () => {
    setIsModalOpenTwo(false);
  };
  const handleCancelTwo = () => {
    setIsModalOpenTwo(false);
  };

  const [isModalOpenThree, setIsModalOpenThree] = useState(false);
  const showModalThree = () => {
    setIsModalOpenThree(true);
  };
  const handleOkThree = () => {
    setIsModalOpenThree(false);
  };
  const handleCancelThree = () => {
    setIsModalOpenThree(false);
  };
  const [isModalOpenFour, setIsModalOpenFour] = useState(false);
  const showModalFour = () => {
    setIsModalOpenFour(true);
  };
  const handleOkFour = () => {
    setIsModalOpenFour(false);
  };
  const handleCancelFour = () => {
    setIsModalOpenFour(false);
  };
  const [isModalOpenFive, setIsModalOpenFive] = useState(false);
  const showModalFive = () => {
    setIsModalOpenFive(true);
  };
  const handleOkFive = () => {
    setIsModalOpenFive(false);
  };
  const handleCancelFive = () => {
    setIsModalOpenFive(false);
  };
  //-------------------------------------------
  return (
    <>
      <Form
        className={cl.counterparties__content}
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <h2>ФИО представителя:</h2>
        <Form.Item
          name="full_name_director"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            name="full_name_director"
            onChange={handleInput}
            maxLength="100"
          />
        </Form.Item>
        {error && error.full_name_director && (
          <Error>{error.full_name_director}</Error>
        )}

        <h2>Компания клиента:</h2>
        <Form.Item
          name="client_company"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            name="client_company"
            onChange={handleInput}
            maxLength="50"
          />
        </Form.Item>
        {error && error.client_company && <Error>{error.client_company}</Error>}

        <h2>Компании:</h2>
        <div className={cl.counterparties__flexContainer}>
          <Form.Item
            name="company_name"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.counterparties__accor}
              showSearch
              allowClear
              onChange={(e) => {
                setState({ ...state, id_company: e });
              }}
              fieldNames={{ label: "company_name", value: "id" }}
              filterOption={(input, option) =>
                (option?.company_name.toLocaleLowerCase() ?? "").includes(
                  input.toLocaleLowerCase()
                )
              }
              options={companies && companies}
            />
          </Form.Item>
          <BsPlusLg className={cl.add__svg} onClick={showModalFour} />
        </div>
        {error && error.company_name && <Error>{error.company_name}</Error>}

        <h2>ИНН:</h2>
        <Form.Item
          name="inn"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            name="inn"
            onChange={handleInput}
            maxLength="20"
          />
        </Form.Item>
        {error && error.inn && <Error>{error.inn}</Error>}

        <h2>Тип кредита:</h2>
        <Form.Item
          name="credit_type"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Select
            id="credit_type"
            className={cl.counterparties__accor}
            onChange={(e) => setState({ ...state, credit_type: e })}
          >
            <Select.Option value="LS">Лизинг</Select.Option>
            <Select.Option value="CR">Кредит</Select.Option>
          </Select>
        </Form.Item>
        {error && error.credit_type && <Error>{error.credit_type}</Error>}
        <h2>Статус клиента:</h2>
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Select
            className={cl.counterparties__accor}
            onChange={(e) => setState({ ...state, status: e })}
          >
            <Select.Option value="success">Принят</Select.Option>
            <Select.Option value="processing">Обработка</Select.Option>
            <Select.Option value="discussion">На рассмотрении</Select.Option>
            <Select.Option value="denied">Отказано</Select.Option>
            <Select.Option value="payback">
              Погашен за счёт отступных
            </Select.Option>
            <Select.Option value="judicial">Судебный</Select.Option>
          </Select>
        </Form.Item>
        {error && error.status && <Error>{error.status}</Error>}
        {state.status == "payback" && (
          <>
            <h2>Отступные документы:</h2>
            <Form.Item
              name="repaid_by_redemption"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    repaid_by_redemption: e.target.files[0],
                  })
                }
              />
            </Form.Item>
            {error && error.repaid_by_redemption && (
              <Error>{error.repaid_by_redemption}</Error>
            )}
          </>
        )}
        {state.status == "judicial" && (
          <>
            <h2>Судебные документы:</h2>
            <Form.Item
              name="court_documents"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    court_documents: e.target.files[0],
                  })
                }
              />
            </Form.Item>
            {error && error.court_documents && (
              <Error>{error.court_documents}</Error>
            )}
          </>
        )}
        <h2>Сумма кредита:</h2>
        <div className={cl.block__input}>
          <span>Введите нужную сумму</span>
          <Form.Item
            name="credit_sum"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.counterparties__input}
              type="text"
              name="credit_sum"
              onChange={handleInput}
              maxLength="30"
            />
          </Form.Item>
          {error && error.credit_sum && <Error>{error.credit_sum}</Error>}
        </div>
        <h2>Телефон компании:</h2>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            onChange={handleInput}
            name="phone"
            maxLength="100"
          />
        </Form.Item>
        {error && error.phone && <Error>{error.phone}</Error>}
        <h2>Юридическии адрес:</h2>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            onChange={handleInput}
            name="address"
            maxLength="100"
          />
        </Form.Item>
        {error && error.address && <Error>{error.address}</Error>}
        <h2>Адрес фактический</h2>
        <Form.Item
          name="client_actiual_address"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            placeholder="Тот же что и по прописке"
            onChange={handleInput}
            name="client_actual_address"
            maxLength="100"
          />
        </Form.Item>
        {error && error.client_actiual_address && (
          <Error>{error.client_actiual_address}</Error>
        )}
        <h2>Средний доход в месяц:</h2>
        <Form.Item
          name="average_salary"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="number"
            onChange={handleInput}
            name="average_salary"
          />
        </Form.Item>
        {error && error.average_salary && <Error>{error.average_salary}</Error>}
        <h2>Размер собственного вклада:</h2>
        <Form.Item
          name="own_contribution"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="number"
            onChange={handleInput}
            name="own_contribution"
          />
        </Form.Item>
        {error && error.own_contribution && (
          <Error>{error.own_contribution}</Error>
        )}
        <h2>Активы на момент анализа:</h2>
        <Form.Item
          name="assets"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            onChange={handleInput}
            name="assets"
          />
        </Form.Item>
        {error && error.assets && <Error>{error.assets}</Error>}

        <h2>Текущие кредиты:</h2>
        <Form.Item
          name="current_loan"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            onChange={handleInput}
            name="current_loan"
            maxLength="200"
          />
        </Form.Item>
        {error && error.current_loan && <Error>{error.current_loan}</Error>}
        <h2>Залогове имущество:</h2>
        <div className={cl.counterparties__flexContainer}>
          <Form.Item
            name="id_property"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.counterparties__accor}
              showSearch
              allowClear
              onChange={(e) => {
                setState({ ...state, id_property: e });
              }}
              fieldNames={{ label: "type", value: "id" }}
              filterOption={(input, option) =>
                (option?.type.toLocaleLowerCase() ?? "").includes(
                  input.toLocaleLowerCase()
                )
              }
              options={properties && properties}
            />
          </Form.Item>
          <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
        </div>
        {error && error.id_property && <Error>{error.id_property}</Error>}
        <h2>Переговоры:</h2>
        <div>
          <div className={cl.counterparties__flexContainer}>
            <Form.Item
              name="id_num_parley"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, id_num_parley: e });
                }}
                fieldNames={{ label: "name", value: "id" }}
                filterOption={(input, option) =>
                  (option?.name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={conversations && conversations}
              />
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalThree} />
          </div>
          {error && error.id_num_parley && <Error>{error.id_num_parley}</Error>}
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
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Activites />
      </Modal>
      <Modal
        open={isModalOpenTwo}
        onOk={handleOkTwo}
        onCancel={handleCancelTwo}
      >
        <PropertyContent />
      </Modal>
      <Modal
        open={isModalOpenThree}
        onOk={handleOkThree}
        onCancel={handleCancelThree}
      >
        <ConversationsContent />
      </Modal>
      <Modal
        open={isModalOpenFour}
        onOk={handleOkFour}
        onCancel={handleCancelFour}
      >
        <CompaniesContent />
      </Modal>
      <Modal
        open={isModalOpenFive}
        onOk={handleOkFive}
        onCancel={handleCancelFive}
      >
        <Activites />
      </Modal>
    </>
  );
};

export default EntitiesComponent;
