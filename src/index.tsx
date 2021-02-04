import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RequestReducer from "./reducers/RequestReducerts";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import IDReducer from "./reducers/IDReducer";
import RefferalReducer from "./reducers/RefferalReducer";
import ClientReducer from "./reducers/ClientReducer";
import ApprovedQuoteReducer from "./reducers/ApprovedQuoteReducer";
import UserReducer from "./reducers/UserReducer";

const store = createStore(combineReducers({ 
  requestReducer: RequestReducer, 
  idReducer: IDReducer, 
  RefferalReducer: RefferalReducer,
  ClientReducer: ClientReducer,
  ApprovedQuoteReducer: ApprovedQuoteReducer,
  UserReducer
}))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
