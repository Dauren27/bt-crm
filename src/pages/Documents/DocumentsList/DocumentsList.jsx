import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import Table from "../../../components/Table/Table";
import {
  deleteDocument,
  getDocument,
  getDocuments,
} from "../../../features/documents/documentsActions";
import Layout from "../../../Layout/Layout";
import cl from "./documentsList.module.scss";

const DocumentsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);
  const { documentsList, deleteSuccess, deleteLoading } = useSelector(
    (state) => state.documents
  );
  const deleteDoc = () => {
    documents.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteDocument({ id: doc.id })).then(() =>
          dispatch(getDocuments())
        );
      }
    });
  };
  const [documents, setDocuments] = useState(documentsList && documentsList);
  useEffect(() => {
    setDocuments(documentsList);
  }, [documentsList]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempDocuments = documents.map((document) => {
        return { ...document, isChecked: checked };
      });
      setDocuments(tempDocuments);
    } else {
      let tempDocuments = documents.map((document) =>
        document.id == name ? { ...document, isChecked: checked } : document
      );
      setDocuments(tempDocuments);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const navigateToDocument = (id) => {
    console.log("id ", id);
    dispatch(getDocument({ id: id })).then(() =>
      navigate(`/documents/document/${id}`)
    );
  };
  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Докуметов на КК</h2>
          <button onClick={() => navigate("/documents/add")}>Добавить</button>
        </div>
        <div className={cl.content}>
          <div className={cl.content__search}>
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
              placeholder="Пойск"
            />
            <BiSearch />
          </div>
          <div className={cl.content__deleteDiv}>
            <button className={cl.content__delete} onClick={deleteDoc}>
              Удалить
            </button>
          </div>
          {deleteSuccess && <Success>Документы были успешно удалены</Success>}
          {deleteLoading && <Loading>Удаление...</Loading>}
          <div className={cl.content__list}>
            {documents && (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !documents.some(
                          (document) => document?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Скоринг</th>
                  <th>Дата создания</th>
                </tr>
                {documents
                  .filter((item) =>
                    item.id.toString().toLowerCase().includes(searchValue)
                  )
                  .map((document) => (
                    <tr key={document.id} className="body__tr">
                      <td>
                        <input
                          type="checkbox"
                          name={document.id}
                          checked={document?.isChecked || false}
                          onChange={handleChange}
                        />
                      </td>
                      <td
                        className="main_field"
                        onClick={() => navigateToDocument(document.id)}
                      >
                        {document.id}
                      </td>
                      <td>{document.scoring}</td>
                      <td>{document.created_date}</td>
                    </tr>
                  ))}
              </Table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsList;
