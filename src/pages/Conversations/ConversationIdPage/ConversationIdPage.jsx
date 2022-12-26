import { Form, Input, Select, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import {
  getConversations,
  patchConversation,
} from "../../../features/conversations/conversationsActions";
import cl from "../ConversationsAdd/conversations.module.scss";
import Layout from "../../../Layout/Layout";
import { useNavigate } from "react-router";
import Individuals from "../../../components/Individuals/Individuals";
import Entities from "../../../components/EntitiesComponent/Entities";
import {
  getClient,
  getClients,
} from "../../../features/clients/clientsActions";
import { getEntities, getEntity } from "../../../features/entity/entityActions";
import ClientIdPageContent from "../../Counterparties/ClientIdPage/ClientIdPageContent";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import EntityIdPageContent from "../../Counterparties/EntityIdPage/EntityIdPageContent";

const ConversationIdPage = () => {
  //----API-----
  const { patchLoading, patchSuccess, patchError, conversationInfo } =
    useSelector((state) => state.conversations);
  const { clients } = useSelector((state) => state.counterparties);
  const { entities } = useSelector((state) => state.entity);
  const [state, setState] = useState({
    entity_id: conversationInfo && conversationInfo.entity_id,
    client_id: conversationInfo && conversationInfo.client_id,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  const submitForm = () => {
    dispatch(patchConversation({ id: conversationInfo.id, obj: state })).then(
      () => dispatch(getConversations())
    );
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!conversationInfo) navigate("/conversations");
  }, []);
  useEffect(() => {
    if (patchSuccess) navigate("/conversations");
  }, [patchSuccess]);
  const reversed = (arr) => {
    const arr2 = [...arr];
    arr2.reverse();
    return arr2;
  };
  const openClientModal = (id) => {
    dispatch(getClient({ id: id })).then(() => showModalThree());
  };
  const openEntityModal = (id) => {
    dispatch(getEntity({ id: id })).then(() => showModalFour());
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
  const handleCancelClientModal = () => {
    setIsModalOpenThree(false);
  };

  const [isModalOpenFour, setIsModalOpenFour] = useState(false);
  const showModalFour = () => {
    setIsModalOpenFour(true);
  };
  const handleOkFour = () => {
    setIsModalOpenFour(false);
  };
  const handleCancelEntityModal = () => {
    setIsModalOpenFour(false);
  };
  //-------------------------------------------
  return (
    <Layout>
      {conversationInfo && (
        <div>
          <Form
            className={cl.conversations}
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {conversationInfo.id}.{conversationInfo.client}
            </h2>
            <div className={cl.conversations__checkbox}>
              <h2 className={cl.conversations__title}>Личная встреча: </h2>
              <input
                type="checkbox"
                className={cl.conversations__checkox}
                defaultChecked={conversationInfo.is_meeting}
                onChange={async (e) => {
                  setState({
                    ...state,
                    is_meeting: e.target.checked,
                  });
                }}
              />
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Клиент: </h2>
              <Input
                className={cl.conversations__input}
                name="client"
                defaultValue={conversationInfo.client}
                onChange={handleInput}
                maxLength="100"
              />
              {patchError && patchError.client && (
                <Error>{patchError.client}</Error>
              )}
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Дата: </h2>
              <Input
                className={cl.conversations__input}
                name="date"
                defaultValue={conversationInfo.date}
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.date && (
                <Error>{patchError.date}</Error>
              )}
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Номер телефона: </h2>
              <Input
                className={cl.conversations__input}
                name="phone"
                defaultValue={conversationInfo.phone}
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.phone && (
                <Error>{patchError.phone}</Error>
              )}
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Содержание: </h2>
              <textarea
                className={cl.conversations__textarea}
                name="desc"
                defaultValue={conversationInfo.desc}
                onChange={handleInput}
                maxLength="200"
              ></textarea>
              {patchError && patchError.desc && (
                <Error>{patchError.desc}</Error>
              )}
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>
                Отчёт по результатам:{" "}
              </h2>
              <input
                className={cl.conversations__file}
                type="file"
                name="results_report"
                onChange={async (e) => {
                  setState({
                    ...state,
                    results_report: e.target.files[0],
                  });
                }}
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={conversationInfo.results_report}>
                  {conversationInfo.results_report}
                </a>
              </p>
              {patchError && patchError.results_report && (
                <Error>{patchError.results_report}</Error>
              )}
            </div>
            {/* <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Статистика: </h2>
              <input
                type="file"
                className={cl.conversations__file}
                name="statistics"
                onChange={(e) => {
                  setState({
                    ...state,
                    statistics: e.target.files[0],
                  });
                }}
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={conversationInfo.statistics}>
                  {conversationInfo.statistics}
                </a>
              </p>
              {patchError && patchError.statistics && (
                <Error>{patchError.statistics}</Error>
              )}
            </div> */}
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Физическое лицо:</h2>
              <div className={cl.conversations__select__container}>
                <Form.Item name="client_id">
                  <Select
                    disabled={state.entity_id}
                    showSearch
                    allowClear
                    onChange={(e) => {
                      setState({ ...state, client_id: e });
                    }}
                    defaultValue={{
                      label: conversationInfo.client_id,
                      value: conversationInfo.client_id,
                    }}
                    className={cl.conversations__accor}
                    fieldNames={{ label: "full_name", value: "id" }}
                    filterOption={(input, option) =>
                      (option?.full_name.toLocaleLowerCase() ?? "").includes(
                        input.toLocaleLowerCase()
                      )
                    }
                    options={clients && reversed(clients)}
                  />
                </Form.Item>
                <BsPlusLg className={cl.add__svg} onClick={showModal} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.client_id && cl.disabled
                  }`}
                  onClick={() => {
                    state.client_id && openClientModal(state.client_id);
                  }}
                />
              </div>
              {patchError && patchError.client_id && (
                <Error>{patchError.client_id}</Error>
              )}
            </div>
            <div className={cl.conversations__category}>
              <h2 className={cl.conversations__title}>Юридическое лицо:</h2>
              <div className={cl.conversations__select__container}>
                <Form.Item name="entity_id">
                  <Select
                    disabled={state.client_id}
                    showSearch
                    allowClear
                    onChange={(e) => {
                      setState({ ...state, entity_id: e });
                    }}
                    defaultValue={{
                      label: conversationInfo.entity_id,
                      value: conversationInfo.entity_id,
                    }}
                    className={cl.conversations__accor}
                    fieldNames={{ label: "full_name_director", value: "id" }}
                    filterOption={(input, option) =>
                      (
                        option?.full_name_director.toLocaleLowerCase() ?? ""
                      ).includes(input.toLocaleLowerCase())
                    }
                    options={entities && reversed(entities)}
                  />
                </Form.Item>
                <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.entity_id && cl.disabled
                  }`}
                  onClick={() => {
                    state.entity_id && openEntityModal(state.entity_id);
                  }}
                />
              </div>
              {patchError && patchError.entity_id && (
                <Error>{patchError.entity_id}</Error>
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
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Individuals isModal={true} />
          </Modal>
          <Modal
            open={isModalOpenTwo}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
          >
            <Entities isModal={true} />
          </Modal>
          <Modal
            open={isModalOpenThree}
            onOk={handleOkThree}
            onCancel={handleCancelClientModal}
          >
            <ClientIdPageContent
              isModal
              handleCancelClientModal={handleCancelClientModal}
            />
          </Modal>
          <Modal
            open={isModalOpenFour}
            onOk={handleOkFour}
            onCancel={handleCancelEntityModal}
          >
            <EntityIdPageContent
              isModal
              handleCancelEntityModal={handleCancelEntityModal}
            />
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default ConversationIdPage;
