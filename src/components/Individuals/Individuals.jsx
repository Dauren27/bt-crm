import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import cl from "../../pages/Counterparties/CounterpartiesAdd/counterparties.module.scss";
import { Modal } from "antd";
import Recipients from "../../pages/Recipients/RecipientsAdd/RecipientsContent";
import { BsPlusLg } from "react-icons/bs";
import { getUserDetail } from "../../features/user/userActions";
import ConversationsContent from "../../pages/Conversations/ConversationsAdd/ConversationsContent";
import {
  getGuarantor,
  getGuarantors,
} from "../../features/guarantors/guarantorsActions";
import { getConversations } from "../../features/conversations/conversationsActions";
import {
  fetchClients,
  getClients,
} from "../../features/clients/clientsActions";
import { getProperties } from "../../features/property/propertyActions";
import PropertyContent from "../../pages/Property/PropertyAdd/PropertyContent";
import Error from "../Error/Error";
import Success from "../Success/Success";
import Loading from "../Loading/Loading";
import { RiPencilFill } from "react-icons/ri";
import RecipientIdPageContent from "../../pages/Recipients/RecipientIdPage/RecipietntIdPageContent";
import { useNavigate } from "react-router";

const Individuals = () => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const [idCreditSpec, setIdCreditSpec] = useState("");
  const { clientsInfo } = useSelector((state) => state.counterparties);
  const { guarantors } = useSelector((state) => state.guarantor);
  const { propertyInfo, properties } = useSelector((state) => state.property);
  const { conversationInfo, conversations } = useSelector(
    (state) => state.conversations
  );
  const navigate = useNavigate();
  const [state, setState] = useState({
    id_credit_spec: "",
    full_name: "",
    credit_type: "",
    status: "",
    repaid_by_redemption: null,
    court_documents: null,
    credit_sum: "",
    marital_status: "",
    credit_history: null,
    phone: "",
    address: "",
    client_actual_address: "",
    income_statement: null,
    contracts: null,
    report: null,
    monitoring_report: null,
    guarantor: null,
    id_property: null,
    meet_conversation: null,
  });
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    token && dispatch(getUserDetail(token.access));
    dispatch(getGuarantors());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const submitForm = async (e) => {
    dispatch(fetchClients(state)).then(() => dispatch(getClients()));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { loading, error, success } = useSelector(
    (state) => state.counterparties
  );
  const reversed = (arr) => {
    const arr2 = [...arr];
    arr2.reverse();
    return arr2;
  };
  // console.log(propertyInfo);
  // useEffect(()=>{
  //   setState({...state, id_property: propertyInfo && propertyInfo.id})
  // },[propertyInfo])
  // console.log(state.id_property);
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
        <h2>ФИО клиента:</h2>
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Input
            className={cl.counterparties__input}
            type="text"
            name="full_name"
            onChange={handleInput}
            maxLength="100"
          />
        </Form.Item>
        {error && error.full_name && <Error>{error.full_name}</Error>}
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
          {error && error.status && <Error>{error.status}</Error>}
        </div>
        <h2>Семейное положение:</h2>
        <Form.Item
          name="marital_status"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <Select
            className={cl.counterparties__accor}
            onChange={(e) => setState({ ...state, marital_status: e })}
          >
            <Select.Option value="married">Женат/Замужем</Select.Option>
            <Select.Option value="divorced">Разведен</Select.Option>
            <Select.Option value="widow/widower">Вдова/Вдовец</Select.Option>
            <Select.Option value="single">Холост/Незамужем</Select.Option>
          </Select>
        </Form.Item>
        {error && error.status && <Error>{error.status}</Error>}
        <h2>Кредитная история:</h2>
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
        {error && error.status && <Error>{error.status}</Error>}
        <h2>Номер телефона:</h2>
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
        <h2>Адрес прописки:</h2>
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
        {error && error.status && <Error>{error.status}</Error>}
        <h2>Адрес фактический</h2>
        <Form.Item
          name="client_actual_address"
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
        {error && error.status && <Error>{error.status}</Error>}
        <h2>Справка о доходах:</h2>
        <Form.Item
          name="income_statement"
          rules={[{ required: true, message: "Заполните это поле" }]}
        >
          <input
            type="file"
            onChange={(e) =>
              setState({
                ...state,
                income_statement: e.target.files[0],
              })
            }
          />
        </Form.Item>
        {error && error.income_statement && (
          <Error>{error.income_statement}</Error>
        )}
        <h2>Договора с подрядчиками и поставщиками:</h2>
        <Form.Item
          name="contracts"
          rules={[{ required: true, message: "Заполните это поле" }]}
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
        <h2>Отчёт подрядчиков и поставщиков об оказанной услуге:</h2>
        <Form.Item
          name="report"
          rules={[{ required: true, message: "Заполните это поле" }]}
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
        <h2>Отчёт по мониторингу:</h2>
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
        <h2>Поручитель:</h2>
        <div className={cl.counterparties__flexContainer}>
          <Form.Item
            name="guarantor"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.counterparties__accor}
              showSearch
              allowClear
              onChange={(e) => {
                setState({ ...state, guarantor: e });
                console.log(e);
              }}
              fieldNames={{ label: "full_name", value: "id" }}
              filterOption={(input, option) =>
                (option?.full_name.toLocaleLowerCase() ?? "").includes(
                  input.toLocaleLowerCase()
                )
              }
              options={guarantors && reversed(guarantors)}
            />
          </Form.Item>
          <BsPlusLg className={cl.add__svg} onClick={showModal} />
          <RiPencilFill
            className={cl.change__svg}
            onClick={() => {
              dispatch(getGuarantor(state.guarantor)).then(() => {
                if (state.guarantor) showModalFour();
              });
            }}
          />
        </div>
        {error && error.guarantor && <Error>{error.guarantor}</Error>}
        <h2>Залоговое имущество:</h2>
        <div className={cl.counterparties__flexContainer}>
          <Form.Item
            name="id_property"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.counterparties__accor}
              showSearch
              allowClear
              fieldNames={{ label: "type", value: "id" }}
              //value={state.id_property}
              onChange={(e) => {
                setState({ ...state, id_property: e });
              }}
              filterOption={(input, option) =>
                (option?.type.toLocaleLowerCase() ?? "").includes(
                  input.toLocaleLowerCase()
                )
              }
              options={properties && reversed(properties)}
            />
          </Form.Item>
          <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
          <RiPencilFill className={cl.change__svg} />
        </div>
        {error && error.id_property && <Error>{error.id_property}</Error>}
        <h2>Переговоры:</h2>
        <div>
          <div className={cl.counterparties__flexContainer}>
            <Form.Item
              name="meet_conversation"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, meet_conversation: e });
                }}
                fieldNames={{ label: "name", value: "id" }}
                filterOption={(input, option) =>
                  (option?.name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={conversations && reversed(conversations)}
              />
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalThree} />
            <RiPencilFill className={cl.change__svg} />
          </div>
          {error && error.meet_conversation && (
            <Error>{error.meet_conversation}</Error>
          )}
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
        <Recipients />
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
        <RecipientIdPageContent />
      </Modal>
    </>
  );
};

export default Individuals;
