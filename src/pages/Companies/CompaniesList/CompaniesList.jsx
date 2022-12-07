import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table/Table";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import cl from "../../Documents/DocumentsList/documentsList.module.scss";
import {
  deleteCompany,
  getCompanies,
  getCompany,
} from "../../../features/company/companyActions";
import { BiSearch } from "react-icons/bi";
import Success from "../../../components/Success/Success";
import Loading from "../../../components/Loading/Loading";

const CompaniesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  const { companies, deleteSuccess, deleteLoading } = useSelector(
    (state) => state.companies
  );
  const [companiesList, setCompaniesList] = useState(companies && companies);
  useEffect(() => {
    setCompaniesList(companies);
  }, [companies, dispatch]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempCompanies = companiesList.map((company) => {
        return { ...company, isChecked: checked };
      });
      setCompaniesList(tempCompanies);
    } else {
      let tempCompanies = companiesList.map((company) =>
        company.company_name == name
          ? { ...company, isChecked: checked }
          : company
      );
      setCompaniesList(tempCompanies);
    }
  };
  const deleteDoc = () => {
    companiesList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteCompany({ id: doc.id })).then(() =>
          dispatch(getCompanies())
        );
      }
    });
  };
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const navigateToCompany = (id) => {
    console.log("id ", id);
    dispatch(getCompany({ id: id })).then(() =>
      navigate(`/companies/company/${id}`)
    );
  };
  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Компаний</h2>
          <button onClick={() => navigate("/companies/add")}>Добавить</button>
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
            {companiesList && (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !companiesList.some(
                          (company) => company?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Наименование компании</th>
                  <th>Юридическии адрес</th>
                </tr>
                {companiesList
                  .filter((item) =>
                    item.company_name.toLowerCase().includes(searchValue)
                  )
                  .map((company) => (
                    <tr key={company.id} className="body__tr">
                      <td>
                        <input
                          type="checkbox"
                          name={company.company_name}
                          checked={company?.isChecked || false}
                          onChange={handleChange}
                        />
                      </td>
                      <td className="main_field">
                        <span onClick={() => navigateToCompany(company.id)}>
                          {company.id}
                        </span>
                      </td>
                      <td>{company.company_name}</td>
                      <td>{company.legal_address}</td>
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

export default CompaniesList;
