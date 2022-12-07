import React, { useEffect, useState } from "react";
import { Select, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import cl from "../CounterpartiesAdd/counterparties.module.scss";
import { Modal } from "antd";
import { BsPlusLg } from "react-icons/bs";
import { getUserDetail } from "../../../features/user/userActions";
import Error from "../../../components/Error/Error";
import Success from "../../../components/Success/Success";
import Loading from "../../../components/Loading/Loading";
import {
  getEntities,
  patchEntity,
} from "../../../features/entity/entityActions";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import { getCompanies } from "../../../features/company/companyActions";
import { getActivities } from "../../../features/activity/activityActions";
import { getProperties } from "../../../features/property/propertyActions";
import { getConversations } from "../../../features/conversations/conversationsActions";
import PropertyContent from "../../Property/PropertyAdd/PropertyContent";
import ConversationsContent from "../../Conversations/ConversationsAdd/ConversationsContent";
import CompaniesContent from "../../Companies/CompaniesAdd/CompaniesContent";
import Activites from "../../../components/Actives/Actives";
import Layout from "../../../Layout/Layout";

const EntityIdPage = () => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  const { conversations } = useSelector((state) => state.conversations);
  const { companies } = useSelector((state) => state.companies);
  const { activities } = useSelector((state) => state.activites);
  const { entityInfo, patchLoading, patchSuccess, patchError } = useSelector(
    (state) => state.entity
  );
  const [state, setState] = useState({});
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    token && dispatch(getUserDetail(token.access));
    dispatch(getCompanies());
    dispatch(getActivities());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  const navigate = useNavigate();
  
  const submitForm = () => {
    dispatch(patchEntity(state)).then(() => dispatch(getEntities()));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(entityInfo);
    if (!entityInfo) navigate("/counterparties");
  }, []);
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
  return (
    <Layout>
      {entityInfo && (
        <div>
          <Form
            className={cl.counterparties__content}
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {entityInfo.id}.{entityInfo.full_name_director}
            </h2>
            <h2>ФИО представителя:</h2>
            <Input
              className={cl.counterparties__input}
              type="text"
              name="full_name_director"
              defaultValue={entityInfo.full_name_director}
              onChange={handleInput}
              maxLength="100"
            />
            {patchError && patchError.full_name_director && (
              <Error>{patchError.full_name_director}</Error>
            )}

            <h2>Компания клиента:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              name="client_company"
              defaultValue={entityInfo.client_company}
              onChange={handleInput}
              maxLength="50"
            />
            {patchError && patchError.client_company && (
              <Error>{patchError.client_company}</Error>
            )}

            <h2>Компании:</h2>
            <div className={cl.counterparties__flexContainer}>
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                defaultValue={{
                  label: entityInfo.id_company,
                  value: entityInfo.id_company,
                }}
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
              <BsPlusLg className={cl.add__svg} onClick={showModalFour} />
            </div>
            {patchError && patchError.company_name && (
              <Error>{patchError.company_name}</Error>
            )}
            <h2>ИНН:</h2>
            <Input
              className={cl.counterparties__input}
              type="text"
              defaultValue={entityInfo.inn}
              name="inn"
              onChange={handleInput}
              maxLength="20"
            />
            {patchError && patchError.inn && <Error>{patchError.inn}</Error>}

            <h2>Тип кредита:</h2>

            <Select
              id="credit_type"
              className={cl.counterparties__accor}
              defaultValue={entityInfo.credit_type}
              onChange={(e) => setState({ ...state, credit_type: e })}
            >
              <Select.Option value="LS">Лизинг</Select.Option>
              <Select.Option value="CR">Кредит</Select.Option>
            </Select>
            {patchError && patchError.credit_type && (
              <Error>{patchError.credit_type}</Error>
            )}
            <h2>Статус клиента:</h2>

            <Select
              className={cl.counterparties__accor}
              onChange={(e) => setState({ ...state, status: e })}
              defaultValue={entityInfo.status}
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
            {patchError && patchError.status && (
              <Error>{patchError.status}</Error>
            )}
            {state.status == "payback" && (
              <>
                <h2>Отступные документы:</h2>

                <input
                  type="file"
                  defaultValue={entityInfo}
                  onChange={(e) =>
                    setState({
                      ...state,
                      repaid_by_redemption: e.target.files[0],
                    })
                  }
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={entityInfo.repaid_by_redemption}>
                    {entityInfo.repaid_by_redemption}
                  </a>
                </p>
                {patchError && patchError.repaid_by_redemption && (
                  <Error>{patchError.repaid_by_redemption}</Error>
                )}
              </>
            )}
            {state.status == "judicial" && (
              <>
                <h2>Судебные документы:</h2>

                <input
                  type="file"
                  defaultValue={entityInfo}
                  onChange={(e) =>
                    setState({
                      ...state,
                      court_documents: e.target.files[0],
                    })
                  }
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={entityInfo.court_documents}>
                    {entityInfo.court_documents}
                  </a>
                </p>
                {patchError && patchError.court_documents && (
                  <Error>{patchError.court_documents}</Error>
                )}
              </>
            )}
            <h2>Сумма кредита:</h2>
            <div className={cl.block__input}>
              <span>Введите нужную сумму</span>

              <Input
                className={cl.counterparties__input}
                type="text"
                defaultValue={entityInfo.credit_sum}
                name="credit_sum"
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.credit_sum && (
                <Error>{patchError.credit_sum}</Error>
              )}
            </div>
            <h2>Телефон компании:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              defaultValue={entityInfo.phone}
              onChange={handleInput}
              name="phone"
              maxLength="100"
            />
            {patchError && patchError.phone && (
              <Error>{patchError.phone}</Error>
            )}
            <h2>Юридическии адрес:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              onChange={handleInput}
              defaultValue={entityInfo.address}
              name="address"
              maxLength="100"
            />
            {patchError && patchError.address && (
              <Error>{patchError.address}</Error>
            )}
            <h2>Адрес фактический</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              placeholder="Тот же что и по прописке"
              defaultValue={entityInfo.client_actiual_address}
              onChange={handleInput}
              name="client_actual_address"
              maxLength="100"
            />
            {patchError && patchError.client_actiual_address && (
              <Error>{patchError.client_actiual_address}</Error>
            )}
            
            <h2>Средний доход в месяц:</h2>
            <Input
              className={cl.counterparties__input}
              type="number"
              onChange={handleInput}
              defaultValue={entityInfo.average_salary}
              name="average_salary"
            />
            {patchError && patchError.average_salary && (
              <Error>{patchError.average_salary}</Error>
            )}
            <h2>Размер собственного вклада:</h2>

            <Input
              className={cl.counterparties__input}
              type="number"
              onChange={handleInput}
              defaultValue={entityInfo.own_contribution}
              name="own_contribution"
            />
            {patchError && patchError.own_contribution && (
              <Error>{patchError.own_contribution}</Error>
            )}
            <h2>Активы на момент анализа:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              onChange={handleInput}
              defaultValue={entityInfo.assets}
              name="assets"
            />
            {patchError && patchError.assets && (
              <Error>{patchError.assets}</Error>
            )}

            <h2>Текущие кредиты:</h2>

            <Input
              className={cl.counterparties__input}
              type="text"
              onChange={handleInput}
              defaultValue={entityInfo.current_loan}
              name="current_loan"
              maxLength="200"
            />
            {patchError && patchError.current_loan && (
              <Error>{patchError.current_loan}</Error>
            )}
            <h2>Залогове имущество:</h2>
            <div className={cl.counterparties__flexContainer}>
              <Select
                className={cl.counterparties__accor}
                showSearch
                allowClear
                defaultValue={{
                  label: entityInfo.id_property,
                  value: entityInfo.id_property,
                }}
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
              <BsPlusLg className={cl.add__svg} onClick={showModalTwo} />
            </div>
            {patchError && patchError.id_property && (
              <Error>{patchError.id_property}</Error>
            )}
            <h2>Переговоры:</h2>
            <div>
              <div className={cl.counterparties__flexContainer}>
                <Select
                  className={cl.counterparties__accor}
                  showSearch
                  allowClear
                  defaultValue={{
                    label: entityInfo.id_num_parley,
                    value: entityInfo.id_num_parley,
                  }}
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
                <BsPlusLg className={cl.add__svg} onClick={showModalThree} />
              </div>
              {patchError && patchError.id_num_parley && (
                <Error>{patchError.id_num_parley}</Error>
              )}
            </div>
            {patchLoading && <Loading>Отправка...</Loading>}
            {patchError && (
              <Error style={{ fontSize: "20px" }}>
                Данные не были изменены. Проверьте корректность заполненых
                данных.
              </Error>
            )}
            {patchSuccess && <Success>Данные успешно отправлены.</Success>}
            <Button>Сохранить</Button>
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
        </div>
      )}
    </Layout>
  );
};

export default EntityIdPage;
