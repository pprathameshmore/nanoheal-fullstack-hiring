import React from "react";
import ResultForm from "./components/ResultForm";
import Scans from "./components/Scans";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import ScanDetails from "./components/ScanDetails";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <ResultForm />
          </Route>
          <Route path="/scans" exact>
            <Scans />
          </Route>
          <Route path="/scans/:scanId" exact>
            <ScanDetails />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
