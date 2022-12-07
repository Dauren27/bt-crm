import CounterpartiesAdd from "../pages/Counterparties/CounterpartiesAdd/CounterpartiesAdd";
import RecipientsAdd from "../pages/Recipients/RecipientsAdd/RecipientsAdd";
import ConversationsAdd from "../pages/Conversations/ConversationsAdd/ConversationsAdd";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import RegistrationSpec from "../pages/Registration/RegistrationSpec";
import DocumentAdd from "../pages/Documents/DocumentAdd/DocumentAdd";
import DocumentsList from "../pages/Documents/DocumentsList/DocumentsList";
import CompaniesAdd from "../pages/Companies/CompaniesAdd/CompaniesAdd";
import PropertyAdd from "../pages/Property/PropertyAdd/PropertyAdd";
import CompaniesList from "../pages/Companies/CompaniesList/CompaniesList";
import RecipientsList from "../pages/Recipients/RecipientsList/RecipientsList";
import ConversationsList from "../pages/Conversations/ConversationsList/ConversationsList";
import PropertyList from "../pages/Property/PropertyList/PropertyList";
import CounterpartiesList from "../pages/Counterparties/CounterpartiesList/CounterpartiesList";
import CompanyIdPage from "../pages/Companies/CompanyIdPage/CompanyIdPage";
import DocumentIdPage from "../pages/Documents/DocumentIdPage/DocumentIdPage";
import ConversationIdPage from "../pages/Conversations/ConversationIdPage/ConversationIdPage";
import ClientIdPage from "../pages/Counterparties/ClientIdPage/ClientIdPage";
import EntityIdPage from "../pages/Counterparties/EntityIdPage/EntityIdPage";
import RecipientIdPage from "../pages/Recipients/RecipientIdPage/RecipientsIdPage";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/documents/add" element={<DocumentAdd />} />
      <Route path="/documents" element={<DocumentsList />} />
      <Route path="/documents/document/:id" element={<DocumentIdPage />} />
      <Route path="/companies/add" element={<CompaniesAdd />} />
      <Route path="/companies" element={<CompaniesList />} />
      <Route path="/companies/company/:id" element={<CompanyIdPage />} />
      <Route path="/recipients/add" element={<RecipientsAdd />} />
      <Route path="/recipients" element={<RecipientsList />} />
      <Route path="/recipients/recipient/:id" element={<RecipientIdPage />} />
      <Route path="/conversations/add" element={<ConversationsAdd />} />
      <Route path="/conversations" element={<ConversationsList />} />
      <Route
        path="/conversations/conversation/:id"
        element={<ConversationIdPage />}
      />
      <Route path="/properties/add" element={<PropertyAdd />} />
      <Route path="/properties" element={<PropertyList />} />
      <Route path="*" element={<DocumentsList />} />
      <Route path="/counterparties/add" element={<CounterpartiesAdd />} />
      <Route path="/counterparties" element={<CounterpartiesList />} />
      <Route path="/counterparties/client/:id" element={<ClientIdPage />} />
      <Route path="/counterparties/entity/:id" element={<EntityIdPage />} />
    </Routes>
  );
};

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<RegistrationSpec />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};
