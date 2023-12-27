import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/index";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (

    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>


  );
}



export default App;
