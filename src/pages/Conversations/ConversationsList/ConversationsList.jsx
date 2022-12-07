import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../Layout/Layout";
import cl from "../../Documents/DocumentsList/documentsList.module.scss";
import { useNavigate } from "react-router";
import Table from "../../../components/Table/Table";
import {
  deleteConversation,
  getConversation,
  getConversations,
} from "../../../features/conversations/conversationsActions";
import { BiSearch } from "react-icons/bi";
import Loading from "../../../components/Loading/Loading";
import Success from "../../../components/Success/Success";
import Error from "../../../components/Error/Error";
const ConversationsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);
  const { conversations, deleteLoading, deleteSuccess, deleteError } = useSelector(
    (state) => state.conversations
  );
  const [conversationsList, setConversationsList] = useState(
    conversations && conversations
  );
  useEffect(() => {
    setConversationsList(conversations);
  }, [conversations]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempConversations = conversationsList.map((conversation) => {
        return { ...conversation, isChecked: checked };
      });
      setConversationsList(tempConversations);
    } else {
      let tempConversations = conversationsList.map((conversation) =>
        conversation.id == name
          ? { ...conversation, isChecked: checked }
          : conversation
      );
      setConversationsList(tempConversations);
    }
  };
  const deleteDoc = () => {
    conversationsList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteConversation({ id: doc.id })).then(() =>
          dispatch(getConversations())
        );
      }
    });
  };
  const [searchValue, setSearchValue] = useState("");
  const navigateToConversation = (id) => {
    dispatch(getConversation({ id: id })).then(() =>
      navigate(`/conversations/conversation/${id}`)
    );
  };
  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Переговоров</h2>
          <button onClick={() => navigate("/conversations/add")}>
            Добавить
          </button>
        </div>
        <div className={cl.content}>
          <div className={cl.content__search}>
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value.toLocaleLowerCase());
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
          {deleteSuccess && <Success>Данные были успешно удалены</Success>}
          {deleteLoading && <Loading>Удаление...</Loading>}
          {deleteError && <Error>Произошла ошибка при удалении...</Error> }
          <div className={cl.content__list}>
            {conversationsList && (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !conversationsList.some(
                          (conversation) => conversation?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Дата</th>
                </tr>
                {conversationsList
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchValue)
                  )
                  .map((conversation) => (
                    <tr key={conversation.id} className="body__tr">
                      <td>
                        <input
                          type="checkbox"
                          name={conversation.id}
                          checked={conversation?.isChecked || false}
                          onChange={handleChange}
                        />
                      </td>
                      <td
                        className="main_field"
                        onClick={() => navigateToConversation(conversation.id)}
                      >
                        {conversation.id}
                      </td>
                      <td>{conversation.name}</td>
                      <td>{conversation.date}</td>
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

export default ConversationsList;
