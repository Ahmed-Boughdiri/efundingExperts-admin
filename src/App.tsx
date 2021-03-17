import React from 'react';
import './App.css';
import RequestedUsers from "./pages/RequestedUsers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Request from "./pages/Request";
import NewRefferals from "./pages/NewRefferals";
import Refferal from "./pages/Refferal";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import ApprovedQuotes from "./pages/ApprovedQuotes";
import ApprovedQuote from "./pages/ApprovedQuote";
import Users from "./pages/Users";
import User from "./pages/User";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/requests" component={RequestedUsers} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/refferals" component={NewRefferals} />
        <Route exact path="/refferal" component={Refferal} />
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/client" component={Client} />
        <Route exact path="/quotes/approved" component={ApprovedQuotes} />
        <Route exact path="/quotes/approved/preview" component={ApprovedQuote} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/preview" component={User} />
      </Switch>
    </Router>
  );
}

export default App;
