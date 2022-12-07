import { Form, Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import Layout from "../../../Layout/Layout";
import cl from "../DocumentAdd/documents.module.scss";
import { BsPlusLg } from "react-icons/bs";
import { Modal } from "antd";
import Individuals from "../../../components/Individuals/Individuals";
import Entities from "../../../components/EntitiesComponent/Entities";
import { getUserDetail } from "../../../features/user/userActions";
import { getClients } from "../../../features/clients/clientsActions";
import {
  getDocuments,
  patchDocument,
} from "../../../features/documents/documentsActions";
import { getEntities } from "../../../features/entity/entityActions";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import { useNavigate } from "react-router";

const DocumentIdPage = () => {
  //----API-----
  const dispatch = useDispatch();

  const { patchLoading, patchError, patchSuccess, documentInfo } = useSelector(
    (state) => state.documents
  );
  const { clients } = useSelector((state) => state.counterparties);
  const { entities } = useSelector((state) => state.entity);
  const [state, setState] = useState({});
  useEffect(() => {
    dispatch(getUserDetail());
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!documentInfo) navigate("/documents");
  }, []);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchDocument({ id: documentInfo.id, obj: state })).then(() =>
      dispatch(getDocuments())
    );
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
  //-------------------------------------------
  return (
    <Layout>
      {documentInfo && (
        <div className={cl.documents}>
          <h2 className={cl.title}>{documentInfo.id}</h2>
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
            <div className={cl.documents__category}>
              <h2 className={cl.documents__title}>Решение КК (скан)</h2>
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
            <div className={cl.documents__category}>
              <h2 className={cl.documents__title}>
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
            <div className={cl.documents__category}>
              <h2 className={cl.documents__title}>Скоринг:</h2>
              <Input
                className={cl.documents__input}
                defaultValue={documentInfo.scoring}
                onChange={handleInput}
                name="scoring"
              />
              {patchError && patchError.scoring && (
                <Error>{patchError.scoring}</Error>
              )}
            </div>
            <div className={cl.documents__category}>
              <h2 className={cl.documents__title}>Физическое лицо:</h2>
              <div className={cl.documents__select__container}>
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
                  className={cl.documents__accor}
                  fieldNames={{ label: "full_name", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.full_name.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={clients && clients}
                />
                <BsPlusLg className={cl.add__svg} onClick={showModal} />
              </div>
              {patchError && patchError.id_client && (
                <Error>{patchError.id_client}</Error>
              )}
            </div>
            <div className={cl.documents__category}>
              <h2 className={cl.documents__title}>Юридическое лицо:</h2>
              <div className={cl.documents__select__container}>
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
                  className={cl.documents__accor}
                  fieldNames={{ label: "full_name_director", value: "id" }}
                  filterOption={(input, option) =>
                    (
                      option?.full_name_director.toLocaleLowerCase() ?? ""
                    ).includes(input.toLocaleLowerCase())
                  }
                  options={entities && entities}
                />
                <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
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
            <Individuals />
          </Modal>
          <Modal
            open={isModalOpenTwo}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
          >
            <Entities />
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default DocumentIdPage;
