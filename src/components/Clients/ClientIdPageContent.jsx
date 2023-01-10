import React, { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import cl from "../style.module.scss";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import Recipients from "../Recipients/RecipientsAddContent";
import { BsPlusLg } from "react-icons/bs";
import ConversationsContent from "../Conversations/ConversationAddContent";
import {
  getGuarantor,
  getGuarantors,
} from "../../features/guarantors/guarantorsActions";
import { getConversations } from "../../features/conversations/conversationsActions";
import { getClients, patchClient } from "../../features/clients/clientsActions";
import {
  getProperties,
  getProperty,
} from "../../features/property/propertyActions";
import Error from "../UI/Error/Error";
import Success from "../UI/Success/Success";
import Loading from "../UI/Loading/Loading";
import PropertyContent from "../Properties/PropertyAddContent";
import { RiPencilFill } from "react-icons/ri";
import RecipientIdPageContent from "../Recipients/RecipietntIdPageContent";
import PropertyIdPageContent from "../Properties/PropertyIdPageContent";
import { useRouter } from "next/router";

const ClientIdPageContent = ({ isModal = false, handleCancelClientModal }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { guarantors } = useSelector((state) => state.guarantor);
  const { properties } = useSelector((state) => state.property);
  const { patchLoading, patchError, patchSuccess, clientInfo } = useSelector(
    (state) => state.counterparties
  );
  useEffect(() => {
    if (!clientInfo) push("/counterparties");
  }, []);
  const [state, setState] = useState({
    address: clientInfo && clientInfo.address,
    client_actual_address: clientInfo && clientInfo.client_actual_address,
    credit_sum: clientInfo && clientInfo.credit_sum,
    credit_type: clientInfo && clientInfo.credit_type,
    full_name: clientInfo && clientInfo.full_name,
    id_guarantor: clientInfo && clientInfo.id_guarantor,
    id_property: clientInfo && clientInfo.id_property,
    marital_status: clientInfo && clientInfo.marital_status,
    phone: clientInfo && clientInfo.phone,
    status: clientInfo && clientInfo.status,
  });

  useEffect(() => {
    dispatch(getGuarantors());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const submitForm = async (e) => {
    dispatch(patchClient({ id: clientInfo.id, obj: state })).then(() => {
      dispatch(getClients());
    });
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    clientInfo &&
      setState({
        address: clientInfo.address,
        client_actual_address: clientInfo.client_actual_address,
        credit_sum: clientInfo.credit_sum,
        credit_type: clientInfo.credit_type,
        full_name: clientInfo.full_name,
        id_guarantor: clientInfo.id_guarantor,
        id_property: clientInfo.id_property,
        marital_status: clientInfo.marital_status,
        phone: clientInfo.phone,
        status: clientInfo.status,
      });
  }, [clientInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) push("/counterparties");
    if (isModal && patchSuccess) {
      handleCancelClientModal && handleCancelClientModal();
    }
  }, [patchSuccess]);
  const reversed = (arr) => {
    const arr2 = [...arr];
    arr2.reverse();
    return arr2;
  };
  const openRecipientModal = (id) => {
    dispatch(getGuarantor({ id: id })).then(() => showModalFour());
  };
  const openPropertyModal = (id) => {
    dispatch(getProperty({ id: id })).then(() => showModalFive());
  };
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
    <div>
      {clientInfo && (
        <div className={cl.content}>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {clientInfo.id}.{clientInfo.full_name}
            </h2>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>ФИО клиента:</h2>
              <Input
                className={cl.content__input}
                type="text"
                name="full_name"
                onChange={handleInput}
                value={state.full_name}
                maxLength="100"
              />
              {patchError && patchError.full_name && (
                <Error>{patchError.full_name}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Тип кредита:</h2>
              <Select
                id="credit_type"
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, credit_type: e })}
                value={state.credit_type}
              >
                <Select.Option value="LS">Лизинг</Select.Option>
                <Select.Option value="CR">Кредит</Select.Option>
              </Select>
              {patchError && patchError.credit_type && (
                <Error>{patchError.credit_type}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Статус клиента:</h2>
              <Select
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, status: e })}
                value={state.status}
              >
                <Select.Option value="success">Выдан</Select.Option>
                <Select.Option value="processing">Обработка</Select.Option>
                <Select.Option value="discussion">
                  На рассмотрении
                </Select.Option>
                <Select.Option value="denied">Отказано</Select.Option>
                <Select.Option value="payback">
                  Погашен за счёт отступных
                </Select.Option>
                <Select.Option value="judicial">Судебный</Select.Option>
              </Select>
              {patchError && patchError.status && (
                <Error>{patchError.status}</Error>
              )}
            </div>
            {(clientInfo.status == "payback" || state.status == "payback") && (
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Отступные документы:</h2>

                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      repaid_by_redemption: e.target.files[0],
                    })
                  }
                />
                {clientInfo.repaid_by_redemption && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={clientInfo.repaid_by_redemption}>
                      {clientInfo.repaid_by_redemption}
                    </a>
                  </p>
                )}
                {patchError && patchError.repaid_by_redemption && (
                  <Error>{patchError.repaid_by_redemption}</Error>
                )}
              </div>
            )}
            {(clientInfo.status == "judicial" ||
              state.status == "judicial") && (
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Судебные документы:</h2>

                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      court_documents: e.target.files[0],
                    })
                  }
                />
                {clientInfo.court_documents && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={clientInfo.court_documents}>
                      {clientInfo.court_documents}
                    </a>
                  </p>
                )}
                {patchError && patchError.court_documents && (
                  <Error>{patchError.court_documents}</Error>
                )}
              </div>
            )}
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Сумма кредита:</h2>
              <Input
                className={cl.content__input}
                type="text"
                name="credit_sum"
                placeholder="Введите нужную сумму"
                onChange={handleInput}
                maxLength="30"
                value={state.credit_sum}
              />
              {patchError && patchError.credit_sum && (
                <Error>{patchError.credit_sum}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Семейное положение:</h2>

              <Select
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, marital_status: e })}
                value={state.marital_status}
              >
                <Select.Option value="married">Женат/Замужем</Select.Option>
                <Select.Option value="divorced">Разведен</Select.Option>
                <Select.Option value="widow/widower">
                  Вдова/Вдовец
                </Select.Option>
                <Select.Option value="single">Холост/Незамужем</Select.Option>
              </Select>
              {patchError && patchError.marital_status && (
                <Error>{patchError.marital_status}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Кредитная история:</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    credit_history: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.credit_history}>
                  {clientInfo.credit_history}
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
                onChange={handleInput}
                name="phone"
                value={state.phone}
                maxLength="100"
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
                onChange={handleInput}
                value={state.address}
                name="address"
                maxLength="100"
              />
              {patchError && patchError.address && (
                <Error>{patchError.address}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Адрес фактический</h2>

              <Input
                className={cl.content__input}
                type="text"
                placeholder="Тот же что и по прописке"
                onChange={handleInput}
                value={state.client_actual_address}
                name="client_actual_address"
                maxLength="100"
              />
              {patchError && patchError.client_actual_address && (
                <Error>{patchError.client_actual_address}</Error>
              )}
            </div>

            {/* {(clientInfo.credit_type == "LS" || state.credit_type == "LS") && (
              <>
                <h2>Размер собственного взноса:</h2>
                <Input
                  className={cl.content__input}
                  type="number"
                  onChange={handleInput}
                  defaultValue={clientInfo.own_contribution}
                  name="own_contribution"
                />
                {patchError && patchError.own_contribution && (
                  <Error>{patchError.own_contribution}</Error>
                )}
              </>
            )} */}
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Справка о доходах:</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    income_statement: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.income_statement}>
                  {clientInfo.income_statement}
                </a>
              </p>
              {patchError && patchError.income_statement && (
                <Error>{patchError.income_statement}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Договора с подрядчиками и поставщиками:
              </h2>

              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    contracts: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.contracts}>{clientInfo.contracts}</a>
              </p>
              {patchError && patchError.contracts && (
                <Error>{patchError.contracts}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Отчёт подрядчиков и поставщиков об оказанной услуге:
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.report}>{clientInfo.report}</a>
              </p>
              {patchError && patchError.report && (
                <Error>{patchError.report}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Отчёт по мониторингу:</h2>

              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    monitoring_report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.monitoring_report}>
                  {clientInfo.monitoring_report}
                </a>
              </p>
              {patchError && patchError.monitoring_report && (
                <Error>{patchError.monitoring_report}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Поручитель:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_guarantor: e });
                  }}
                  value={{
                    label: state.id_guarantor,
                    value: state.id_guarantor,
                  }}
                  fieldNames={{ label: "full_name", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.full_name.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={guarantors && reversed(guarantors)}
                />
                <BsPlusLg className={cl.add__svg} onClick={showModal} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_guarantor && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_guarantor &&
                      openRecipientModal(state.id_guarantor);
                  }}
                />
              </div>
              {patchError && patchError.guarantor && (
                <Error>{patchError.guarantor}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Залоговое имущество:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  value={{
                    label: state.id_property,
                    value: state.id_property,
                  }}
                  fieldNames={{ label: "type", value: "id" }}
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
                <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_property && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_property && openPropertyModal(state.id_property);
                  }}
                />
              </div>
              {patchError && patchError.id_property && (
                <Error>{patchError.id_property}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Кредитный специалсит</h2>
              <input
                className={cl.content__input}
                type="text"
                disabled
                defaultValue={clientInfo.id_credit_spec}
                name="client_actual_address"
                maxLength="100"
              />
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
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Recipients isModal={true} />
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
            <ConversationsContent isModal={true} />
          </Modal>
          <Modal
            open={isModalOpenFour}
            onOk={handleOkFour}
            onCancel={handleCancelFour}
          >
            <RecipientIdPageContent
              isModal
              handleCancelFour={handleCancelFour}
            />
          </Modal>
          <Modal
            open={isModalOpenFive}
            onOk={handleOkFive}
            onCancel={handleCancelFive}
          >
            <PropertyIdPageContent
              isModal
              handleCancelFive={handleCancelFive}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ClientIdPageContent;
