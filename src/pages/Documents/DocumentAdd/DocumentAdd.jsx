import { Form, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import Layout from "../../../Layout/Layout";
import cl from "./documents.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { Modal } from "antd";
import Individuals from "../../../components/Individuals/Individuals";
import Entities from "../../../components/EntitiesComponent/Entities";
import { getUserDetail } from "../../../features/user/userActions";
import {
  getClient,
  getClients,
} from "../../../features/clients/clientsActions";
import {
  fetchDocuments,
  getDocuments,
} from "../../../features/documents/documentsActions";
import { getEntities, getEntity } from "../../../features/entity/entityActions";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import { useNavigate } from "react-router";
import ClientIdPageContent from "../../Counterparties/ClientIdPage/ClientIdPageContent";
import { RiPencilFill } from "react-icons/ri";
import EntityIdPageContent from "../../Counterparties/EntityIdPage/EntityIdPageContent";

const DocumentAdd = () => {
  //----API-----
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitForm = () => {
    dispatch(fetchDocuments(state));
  };
  const [state, setState] = useState({
    committee_decision: null,
    all_contracts: null,
    scoring: null,
    id_client: null,
    id_entity: null,
    id_spec: null,
  });
  useEffect(() => {
    dispatch(getUserDetail());
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  const { clients } = useSelector((state) => state.counterparties);
  const { entities } = useSelector((state) => state.entity);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { loading, error, success } = useSelector((state) => state.documents);
  useEffect(() => {
    if (success) navigate("/documents");
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
      <div className={cl.documents}>
        <Form
          name="basic"
          autoComplete="off"
          onFinish={submitForm}
          onFinishFailed={() => alert("Заполните все поля")}
        >
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>
              Заключение кредитного эксперта (скан)
            </h2>
            <Form.Item
              name="credit_spec_report"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    credit_spec_report: e.target.files[0],
                  })
                }
              />
            </Form.Item>
            {error && error.credit_spec_report && (
              <Error>{error.credit_spec_report}</Error>
            )}
          </div>
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>Решение КК (скан)</h2>
            <Form.Item
              name="committee_decision"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    committee_decision: e.target.files[0],
                  })
                }
              />
            </Form.Item>
            {error && error.committee_decision && (
              <Error>{error.committee_decision}</Error>
            )}
          </div>
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>
              Все заключенные договора, перечень и сканы:
            </h2>
            <Form.Item
              name="all_contracts"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    all_contracts: e.target.files[0],
                  })
                }
              />
            </Form.Item>
            {error && error.all_contracts && (
              <Error>{error.all_contracts}</Error>
            )}
          </div>
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>Скоринг:</h2>
            <Form.Item
              name="scoring"
              rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Input
                className={cl.documents__input}
                onChange={handleInput}
                name="scoring"
              />
            </Form.Item>
            {error && error.scoring && <Error>{error.scoring}</Error>}
          </div>
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>Физическое лицо:</h2>
            <div className={cl.documents__select__container}>
              <Form.Item
                name="id_client"
                //rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_client: e });
                  }}
                  className={cl.documents__accor}
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
                className={`${cl.add__svg} ${!state.id_client && cl.disabled}`}
                onClick={() => {
                  state.id_client && openClientModal(state.id_client);
                }}
              />
            </div>
            {error && error.id_client && <Error>{error.id_client}</Error>}
          </div>
          <div className={cl.documents__category}>
            <h2 className={cl.documents__title}>Юридическое лицо:</h2>
            <div className={cl.documents__select__container}>
              <Form.Item
                name="id_entity"
                //rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_entity: e });
                  }}
                  className={cl.documents__accor}
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
                className={`${cl.add__svg} ${!state.id_entity && cl.disabled}`}
                onClick={() => {
                  state.id_entity && openEntityModal(state.id_entity);
                }}
              />
            </div>
            {error && error.id_entity && <Error>{error.id_entity}</Error>}
          </div>
          {loading && <Loading>Отправка...</Loading>}
          {error && (
            <Error style={{ fontSize: "20px" }}>
              Данные не были отправлены. Проверьте корректность заполненых
              данных.
            </Error>
          )}
          {success && <Success>Данные успешно отправлены.</Success>}
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
    </Layout>
  );
};

export default DocumentAdd;
