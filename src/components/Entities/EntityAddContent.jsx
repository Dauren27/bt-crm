import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import cl from "../style.module.scss";
import { Modal } from "antd";
import { BsPlusLg } from "react-icons/bs";
import ConversationsContent from "../Conversations/ConversationAddContent";
import CompaniesContent from "../Companies/CompanyAddContent";
import Activites from "../Actives/Actives";
import {
  getCompanies,
  getCompany,
} from "../../features/company/companyActions";
import { getConversations } from "../../features/conversations/conversationsActions";
import { getActivities } from "../../features/activity/activityActions";
import {
  fetchEntities,
  getEntities,
} from "../../features/entity/entityActions";
import {
  getProperties,
  getProperty,
} from "../../features/property/propertyActions";
import PropertyContent from "../Properties/PropertyAddContent";
import Error from "../UI/Error/Error";
import Loading from "../UI/Loading/Loading";
import Success from "../UI/Success/Success";
import { useNavigate } from "react-router";
import { RiPencilFill } from "react-icons/ri";
import PropertyIdPageContent from "../Properties/PropertyIdPageContent";
import CompanyIdPageContent from "../Companies/CompanyIdPageContent";

const EntitiesComponent = ({ isModal = false }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties } = useSelector((state) => state.property);
  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getActivities());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const submitForm = () => {
    if (isModal) {
      dispatch(fetchEntities(state)).then(() => {
        success && dispatch(getEntities());
      });
    } else {
      dispatch(fetchEntities(state));
    }
  };
  const { companies } = useSelector((state) => state.companies);
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
    credit_history: null,
    contracts: null,
    report: null,
    monitoring_report: null,
    current_loan: "",
    id_company: "",
    id_property: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { loading, success, error, successModal } = useSelector(
    (state) => state.entity
  );
  useEffect(() => {
    if (!isModal) if (success) navigate("/counterparties");
  }, [success]);
  const reversed = (arr) => {
    const arr2 = [...arr];
    arr2.reverse();
    return arr2;
  };
  const openPropertyModal = (id) => {
    dispatch(getProperty({ id: id })).then(() => showModalSix());
  };
  const openCompanyModal = (id) => {
    dispatch(getCompany({ id: id })).then(() => showModalSeven());
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

  const [isModalOpenSix, setIsModalOpenSix] = useState(false);
  const showModalSix = () => {
    setIsModalOpenSix(true);
  };
  const handleOkSix = () => {
    setIsModalOpenSix(false);
  };
  const handleCancelSix = () => {
    setIsModalOpenSix(false);
  };

  const [isModalOpenSeven, setIsModalOpenSeven] = useState(false);
  const showModalSeven = () => {
    setIsModalOpenSeven(true);
  };
  const handleOkSeven = () => {
    setIsModalOpenSeven(false);
  };
  const handleCancelSeven = () => {
    setIsModalOpenSeven(false);
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
          <h2 className={cl.content__title}>ФИО представителя:</h2>
          <Form.Item
            name="full_name_director"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="full_name_director"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.full_name_director && (
            <Error>{error.full_name_director}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Компания клиента:</h2>
          <Form.Item
            name="client_company"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="client_company"
              onChange={handleInput}
              maxLength="50"
            />
          </Form.Item>
          {error && error.client_company && (
            <Error>{error.client_company}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Компания:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="company_name"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.content__accor}
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
                options={companies && reversed(companies)}
              />
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalFour} />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.id_company && cl.disabled}`}
              onClick={() => {
                state.id_company && openCompanyModal(state.id_company);
              }}
            />
          </div>
          {error && error.id_company && <Error>{error.id_company}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>ИНН:</h2>
          <Form.Item
            name="inn"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="inn"
              onChange={handleInput}
              maxLength="20"
            />
          </Form.Item>
          {error && error.inn && <Error>{error.inn}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Тип кредита:</h2>
          <Form.Item
            name="credit_type"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              id="credit_type"
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, credit_type: e })}
            >
              <Select.Option value="LS">Лизинг</Select.Option>
              <Select.Option value="CR">Кредит</Select.Option>
            </Select>
          </Form.Item>
          {error && error.credit_type && <Error>{error.credit_type}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Статус клиента:</h2>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, status: e })}
            >
              <Select.Option value="success">Выдан</Select.Option>
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
        </div>

        {state.status == "payback" && (
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>Отступные документы:</h2>
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
          </div>
        )}
        {state.status == "judicial" && (
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>Судебные документы:</h2>
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
          </div>
        )}
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Сумма кредита:</h2>
          <Form.Item
            name="credit_sum"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="credit_sum"
              placeholder="Введите нужную сумму"
              onChange={handleInput}
              maxLength="30"
            />
          </Form.Item>
          {error && error.credit_sum && <Error>{error.credit_sum}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Кредитная история:</h2>
          <Form.Item
            name="credit_history"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  credit_history: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.credit_history && (
            <Error>{error.credit_history}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Телефон компании:</h2>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              defaultValue="+996"
              name="phone"
              maxLength="100"
            />
          </Form.Item>
          {error && error.phone && <Error>{error.phone}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Юридическии адрес:</h2>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="address"
              maxLength="100"
            />
          </Form.Item>
          {error && error.address && <Error>{error.address}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Адрес фактический</h2>
          <Form.Item
            name="client_actiual_address"
            //rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
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
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Договора с подрядчиками и поставщиками:
          </h2>
          <Form.Item
            name="contracts"
            //rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  contracts: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.contracts && <Error>{error.contracts}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Отчёт подрядчиков и поставщиков об оказанной услуге:
          </h2>
          <Form.Item
            name="report"
            //rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  report: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.report && <Error>{error.report}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Отчёт по мониторингу:</h2>
          <Form.Item
            name="monitoring_report"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  monitoring_report: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.monitoring_report && (
            <Error>{error.monitoring_report}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Средний доход в месяц:</h2>
          <Form.Item
            name="average_salary"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="number"
              onChange={handleInput}
              name="average_salary"
            />
          </Form.Item>
          {error && error.average_salary && (
            <Error>{error.average_salary}</Error>
          )}
        </div>

        {state.credit_type == "LS" && (
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>Размер собственного взноса:</h2>
            <Form.Item
              name="own_contribution"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.content__input}
                type="number"
                onChange={handleInput}
                name="own_contribution"
              />
            </Form.Item>
            {error && error.own_contribution && (
              <Error>{error.own_contribution}</Error>
            )}
          </div>
        )}
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Активы на момент анализа:</h2>
          <Form.Item
            name="assets"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="assets"
            />
          </Form.Item>
          {error && error.assets && <Error>{error.assets}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Текущие кредиты:</h2>
          <Form.Item
            name="current_loan"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              onChange={handleInput}
              name="current_loan"
              maxLength="200"
            />
          </Form.Item>
          {error && error.current_loan && <Error>{error.current_loan}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Залогове имущество:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="id_property"
              //rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.content__accor}
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
                options={properties && reversed(properties)}
              />
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.id_property && cl.disabled}`}
              onClick={() => {
                state.id_property && openPropertyModal(state.id_property);
              }}
            />
          </div>
          {error && error.id_property && <Error>{error.id_property}</Error>}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {isModal && success && <Success>Данные успешно отправлены.</Success>}
        <Button disabled={loading}>Отправить</Button>
      </Form>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Activites />
      </Modal>
      <Modal
        open={isModalOpenTwo}
        onOk={handleOkTwo}
        onCancel={handleCancelTwo}
      >
        <PropertyContent isModal={true} />
      </Modal>
      <Modal
        open={isModalOpenThree}
        onOk={handleOkThree}
        onCancel={handleCancelThree}
      >
        <ConversationsContent isModal={true} />
      </Modal>
      <Modal
        open={isModalOpenFour}
        onOk={handleOkFour}
        onCancel={handleCancelFour}
      >
        <CompaniesContent isModal={true} />
      </Modal>
      <Modal
        open={isModalOpenFive}
        onOk={handleOkFive}
        onCancel={handleCancelFive}
      >
        <Activites />
      </Modal>
      <Modal
        open={isModalOpenSix}
        onOk={handleOkSix}
        onCancel={handleCancelSix}
      >
        <PropertyIdPageContent isModal handleCancelSix={handleCancelSix} />
      </Modal>
      <Modal
        open={isModalOpenSeven}
        onOk={handleOkSeven}
        onCancel={handleCancelSeven}
      >
        <CompanyIdPageContent isModal handleCancelSeven={handleCancelSeven} />
      </Modal>
    </div>
  );
};

export default EntitiesComponent;
