import { Form, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button/Button";
import cl from "../style.module.scss";

import { BsPlusLg } from "react-icons/bs";
import { Modal } from "antd";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import { getClient, getClients } from "../../features/clients/clientsActions";
import {
  getDocuments,
  patchDocument,
} from "../../features/documents/documentsActions";
import { getEntities, getEntity } from "../../features/entity/entityActions";
import Error from "../../components/UI/Error/Error";
import Loading from "../../components/UI/Loading/Loading";
import Success from "../../components/UI/Success/Success";
import { useNavigate } from "react-router";
import ClientIdPageContent from "../../components/Clients/ClientIdPageContent";
import { RiPencilFill } from "react-icons/ri";
import EntityIdPageContent from "../../components/Entities/EntityIdPageContent";

const DocumentIdPageContent = () => {
  //----API-----
  const dispatch = useDispatch();
  const { patchLoading, patchError, patchSuccess, documentInfo } = useSelector(
    (state) => state.documents
  );
  const { clients } = useSelector((state) => state.counterparties);
  const { entities } = useSelector((state) => state.entity);
  const [state, setState] = useState({
    scoring: documentInfo && documentInfo.scoring,
    id_client: documentInfo && documentInfo.id_client,
    id_entity: documentInfo && documentInfo.id_entity,
  });
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!documentInfo) navigate("/documents");
  }, []);
  useEffect(() => {
    if (patchSuccess) navigate("/documents");
  }, [patchSuccess]);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchDocument({ id: documentInfo.id, obj: state })).then(() =>
      dispatch(getDocuments())
    );
  };
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
    <div className={cl.content}>
      {documentInfo && (
        <>
          <h2 className={cl.title}>{documentInfo.id}</h2>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Заключение кредитного эксперта (скан):
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    credit_spec_report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.credit_spec_report}>
                  {documentInfo.credit_spec_report}
                </a>
              </p>
              {patchError && patchError.credit_spec_report && (
                <Error>{patchError.credit_spec_report}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Решение КК (скан):</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    committee_decision: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.committee_decision}>
                  {documentInfo.committee_decision}
                </a>
              </p>
              {patchError && patchError.committee_decision && (
                <Error>{patchError.committee_decision}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Все заключенные договора, перечень и сканы:
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    all_contracts: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.all_contracts}>
                  {documentInfo.all_contracts}
                </a>
              </p>
              {patchError && patchError.all_contracts && (
                <Error>{patchError.all_contracts}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Скоринг:</h2>
              <Input
                className={cl.content__input}
                defaultValue={documentInfo.scoring}
                onChange={handleInput}
                name="scoring"
              />
              {patchError && patchError.scoring && (
                <Error>{patchError.scoring}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Физическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_client: e });
                  }}
                  defaultValue={{
                    label: documentInfo.id_client,
                    value: documentInfo.id_client,
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
                <BsPlusLg className={cl.add__svg} onClick={showModal} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_client && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_client && openClientModal(state.id_client);
                  }}
                />
              </div>
              {patchError && patchError.id_client && (
                <Error>{patchError.id_client}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Юридическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_entity: e });
                  }}
                  defaultValue={{
                    label: documentInfo.id_entity,
                    value: documentInfo.id_entity,
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
                <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_entity && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_entity && openEntityModal(state.id_entity);
                  }}
                />
              </div>
              {patchError && patchError.id_entity && (
                <Error>{patchError.id_entity}</Error>
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
        </>
      )}
    </div>
  );
};

export default DocumentIdPageContent;
