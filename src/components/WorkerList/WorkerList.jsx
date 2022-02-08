import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkerList,
  changePage,
  changeCountOnPage,
  deleteWorker,
  sortWorker,
  filterWorker,
  filterWorkerNotFop,
} from "../../actions/workerListAction";

import DialogComponent from "./../../HelperComponents/DialogComponent";
import CreateForm from "../CreateForm/CreateForm";

import have_fop from "./../../assets/image/have_fop.png";
import not_fop from "./../../assets/image/not_fop.png";
import "./WorkerList.scss";

const WorkerList = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [choosenWorker, setChoosenWorker] = useState();

  const headTable = {
    fullName: "Полное имя",
    date: "Дата",
    position: "Должность",
    salary: "Зарплата",
    fop: "ФОП",
  };

  const options = {
    10: 10,
    20: 20,
    50: 50,
    100: 100,
  };

  const { list, sliceList, countOnPage, choosePage } = useSelector(
    ({ workerList }) => workerList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkerList());
  }, []);

  useEffect(() => {
    dispatch(changePage(0));
  }, [list, countOnPage]);

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(!openCreateDialog);
    setIsCreate(true);
  };

  const handleCloseEditeDialog = (index) => {
    setOpenCreateDialog(!openCreateDialog);
    setIsCreate(false);
    setChoosenWorker(index);
  };

  return (
    <main className="page_wrap">
      <DialogComponent
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(!openCreateDialog)}
      >
        <CreateForm
          choosenWorker={choosenWorker}
          isCreate={isCreate}
          handleClose={() => setOpenCreateDialog(!openCreateDialog)}
        />
      </DialogComponent>
      <div className="container">
        <div className="button_wrapper">
          <button onClick={() => handleCloseCreateDialog()}>
            Нанять сотрудника
          </button>
        </div>
        <div className="filter_wrapper">
          <button
            className="fltr_fop"
            onClick={() => {
              dispatch(filterWorker(sliceList[0].fop));
            }}
          >
            ФОП
          </button>
          <button
            className="fltr_fop"
            onClick={() => {
              dispatch(filterWorkerNotFop());
            }}
          >
            Не ФОП
          </button>
        </div>
        <div className="table">
          <div className="row head__table">
            {Object.keys(headTable).map((el, idx) => (
              <div
                onClick={() => dispatch(sortWorker(el))}
                className="col"
                key={idx}
              >
                {headTable[el]}
              </div>
            ))}
            <div className="col">Действия</div>
          </div>
          {sliceList.map((el, index) => (
            <div className="row" key={index}>
              {Object.keys(headTable).map((key, idx) => (
                <div key={idx} className="col">
                  {key === "fop" ? (
                    <img
                      onClick={() => {
                        deleteWorker(index);
                      }}
                      src={el[key] ? have_fop : not_fop}
                      alt="have_fop"
                    ></img>
                  ) : key === "date" ? (
                    `${
                      el.date.getMonth() < 10
                        ? "0" + el.date.getMonth()
                        : el.date.getMonth()
                    }.${
                      el.date.getDate() < 10
                        ? "0" + el.date.getDate()
                        : el.date.getDate()
                    }.${el.date.getFullYear()}`
                  ) : (
                    el[key]
                  )}
                </div>
              ))}
              <div className="col col_btn">
                <button onClick={() => handleCloseEditeDialog(index)}>
                  Редактировать
                </button>
                <button onClick={() => dispatch(deleteWorker(el.id))}>
                  Уволить
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination_wrapper">
          <ul className="pagination">
            {[...Array(Math.ceil(list.length / countOnPage))].map((_, idx) => (
              <li
                className={`${choosePage === idx ? "active" : ""}`}
                key={idx}
                onClick={() => dispatch(changePage(idx))}
              >
                {idx + 1}
              </li>
            ))}
          </ul>
          <select
            value={countOnPage}
            onChange={(e) =>
              dispatch(changeCountOnPage(Number(e.target.value)))
            }
          >
            {Object.keys(options).map((el, idx) => (
              <option key={idx} value={el}>
                {options[el]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
};

export default WorkerList;
