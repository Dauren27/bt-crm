import Layout from "../../../Layout/Layout";
import cl from "../../Documents/DocumentsList/documentsList.module.scss";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import {
  deleteGuarantor,
  getGuarantor,
  getGuarantors,
} from "../../../features/guarantors/guarantorsActions";
import { BiSearch } from "react-icons/bi";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";

const RecipientsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGuarantors());
  }, [dispatch]);
  const {
    guarantors,
    deleteLoading,
    deleteSuccess,
    successMessage,
    patchMessage,
    recipient,
    patchRecipient,
  } = useSelector((state) => state.guarantor);
  const [guarantorsList, setGuarantorsList] = useState(
    guarantors && guarantors
  );
  useEffect(() => {
    setGuarantorsList(guarantors);
  }, [guarantors]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempGuarantors = guarantorsList.map((guarantor) => {
        return { ...guarantor, isChecked: checked };
      });
      setGuarantorsList(tempGuarantors);
    } else {
      let tempGuarantors = guarantorsList.map((guarantor) =>
        guarantor.id == name ? { ...guarantor, isChecked: checked } : guarantor
      );
      setGuarantorsList(tempGuarantors);
    }
  };
  const deleteDoc = () => {
    guarantorsList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteGuarantor({ id: doc.id })).then(() =>
          dispatch(getGuarantors())
        );
      }
    });
  };
  const navigateToRecipient = (id) => {
    dispatch(getGuarantor({ id: id })).then(() =>
      navigate(`/recipients/recipient/${id}`)
    );
  };
  const [searchValue, setSearchValue] = useState("");
  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Поручителей</h2>
          <button onClick={() => navigate("/recipients/add")}>Добавить</button>
        </div>
        <div className={cl.content}>
          <div className={cl.content__search}>
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value.toLocaleLowerCase());
              }}
              placeholder="Поиск"
            />
            <BiSearch />
          </div>
          <div className={cl.content__deleteDiv}>
            <button className={cl.content__delete} onClick={deleteDoc}>
              Удалить
            </button>
          </div>
          {deleteSuccess && <Success>Документ был успешно удален</Success>}
          {deleteLoading && <Loading>Удаление...</Loading>}
          {successMessage && (
            <Success>
              Документ {recipient && recipient.id} был успешно добавлен
            </Success>
          )}
          {patchMessage && (
            <Success>
              Документ {patchRecipient && patchRecipient.id} был успешно изменён
            </Success>
          )}
          <div className={cl.content__list}>
            {guarantorsList ? (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !guarantorsList.some(
                          (guarantor) => guarantor?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>ФИО залогодателя</th>
                  <th>Адрес прописки</th>
                </tr>
                {guarantorsList
                  .filter((item) =>
                    item.full_name.toLowerCase().includes(searchValue)
                  )
                  .map((guarantor) => (
                    <tr
                      key={guarantor.id}
                      className="body__tr"
                      onClick={() => navigateToRecipient(guarantor.id)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name={guarantor.id}
                          checked={guarantor?.isChecked || false}
                          onChange={handleChange}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
                      <td className="main_field">{guarantor.id}</td>
                      <td>{guarantor.full_name}</td>
                      <td>{guarantor.address}</td>
                    </tr>
                  ))}
              </Table>
            ) : (
              <h1 className={cl.documents__loading}>Загрузка...</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipientsList;
