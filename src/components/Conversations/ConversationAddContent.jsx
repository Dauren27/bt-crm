import { Form, Input, Select, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import Error from "../UI/Error/Error";
import Loading from "../UI/Loading/Loading";
import Success from "../UI/Success/Success";
import {
  fetchConversations,
  getConversations,
} from "../../features/conversations/conversationsActions";
import cl from "../style.module.scss";
import { BsPlusLg } from "react-icons/bs";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import { getEntities, getEntity } from "../../features/entity/entityActions";
import ClientIdPageContent from "../Clients/ClientIdPageContent";
import { RiPencilFill } from "react-icons/ri";
import EntityIdPageContent from "../Entities/EntityIdPageContent";
import { getClient, getClients } from "../../features/clients/clientsActions";
import { useRouter } from "next/router";

const ConversationsContent = ({ isModal = false }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [value, setValue] = useState(true);
  const [state, setState] = useState({
    is_meeting: value,
    client: "",
    desc: "",
    phone: "",
    results_report: null,
    statistics: null,
    client_id: null,
    entity_id: null,
  });
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  const { loading, success, error, successModal } = useSelector(
    (state) => state.conversations
  );
  const { clients } = useSelector((state) => state.counterparties);
  const { entities } = useSelector((state) => state.entity);

  const submitForm = () => {
    if (isModal) {
      dispatch(fetchConversations(state)).then(() =>
        dispatch(getConversations())
      );
    } else {
      dispatch(fetchConversations(state));
    }
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!isModal) if (success) push("/conversations");
  }, [success]);

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
    <div className={cl.content}>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__checkbox}>
          <h2 className={cl.content__title}>Личная встреча: </h2>
          <input
            type="checkbox"
            className={cl.content__checkox}
            onChange={async (e) => {
              setState({
                ...state,
                is_meeting: e.target.checked,
              });
            }}
          />
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Клиент: </h2>
          <Form.Item
            name="client"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              name="client"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.client && <Error>{error.client}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Номер телефона: </h2>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              name="phone"
              onChange={handleInput}
              defaultValue="+996"
              maxLength="30"
            />
          </Form.Item>
          {error && error.phone && <Error>{error.phone}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Содержание: </h2>
          <Form.Item
            name="desc"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <textarea
              className={cl.content__textarea}
              name="desc"
              onChange={handleInput}
              maxLength="200"
            ></textarea>
          </Form.Item>
          {error && error.desc && <Error>{error.desc}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Отчёт по результатам: </h2>
          <Form.Item
            name="results_report"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              className={cl.content__file}
              type="file"
              name="results_report"
              onChange={async (e) => {
                setState({
                  ...state,
                  results_report: e.target.files[0],
                });
              }}
            />
          </Form.Item>
          {error && error.results_report && (
            <Error>{error.results_report}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Физическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item name="client_id">
              <Select
                disabled={state.entity_id}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, client_id: e });
                }}
                className={cl.content__accor}
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
              className={`${cl.add__svg} ${!state.client_id && cl.disabled}`}
              onClick={() => {
                state.client_id && openClientModal(state.client_id);
              }}
            />
          </div>
          {error && error.client_id && <Error>{error.client_id}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Юридическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item name="entity_id">
              <Select
                disabled={state.client_id}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, entity_id: e });
                }}
                className={cl.content__accor}
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
              className={`${cl.add__svg} ${!state.entity_id && cl.disabled}`}
              onClick={() => {
                state.entity_id && openEntityModal(state.entity_id);
              }}
            />
          </div>
          {error && error.entity_id && <Error>{error.entity_id}</Error>}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {isModal && successModal && (
          <Success>Данные успешно отправлены.</Success>
        )}
        <Button>Отправить</Button>
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
  );
};

export default ConversationsContent;
