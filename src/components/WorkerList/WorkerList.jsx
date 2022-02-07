import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkerList,
  changePage,
  changeCountOnPage,
  deleteWorker,
} from "../../actions/workerListAction";

import DialogComponent from "./../../HelperComponents/DialogComponent";
import CreateForm from "../CreateForm/CreateForm";

import have_fop from "./../../assets/image/have_fop.png";
import not_fop from "./../../assets/image/not_fop.png";
import "./WorkerList.scss";

const WorkerList = () => {
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

  return (
    <main className="page_wrap">
      <DialogComponent open={true}>
        <CreateForm />
      </DialogComponent>
      <div className="container">
        <div className="button_wrapper">
          <button>Нанять сотрудника</button>
        </div>
        <div className="table">
          <div className="row head__table">
            {Object.values(headTable).map((el, idx) => (
              <div className="col" key={idx}>
                {el}
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
                <button>Редактировать</button>
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
