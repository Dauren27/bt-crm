import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterpartiesSlice from "../features/clients/clientsSlice";
import userReducer from "../features/user/userSlice";
import propertySlice from "../features/property/propertySlice";
import conversationsSlice from "../features/conversations/conversationsSlice";
import entitySlice from "../features/entity/entitySlice";
import companySlise from "../features/company/companySlice";
import guarantorsSlice from "../features/guarantors/guarantorsSlice";
import activitySlice from "../features/activity/activitySlice";
import documentsSlice from "../features/documents/documentsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    counterparties: counterpartiesSlice,
    guarantor: guarantorsSlice,
    property: propertySlice,
    conversations: conversationsSlice,
    entity: entitySlice,
    activites: activitySlice,
    companies: companySlise,
    documents: documentsSlice,
  },
});

export default store;
