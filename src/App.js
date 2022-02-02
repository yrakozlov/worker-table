import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkerList } from "./actions/workerListAction";
import WorkerList from "./components/WorkerList/WorkerList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <WorkerList />
    </div>
  );
}

export default App;
