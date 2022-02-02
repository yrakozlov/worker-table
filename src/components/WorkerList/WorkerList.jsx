import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkerList,
  changePage,
  changeCountOnPage,
} from "../../actions/workerListAction";
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
      <div className="container">
        <div className="table">
          <div className="row head__table">
            {Object.values(headTable).map((el, idx) => (
              <div className="col" key={idx}>
                {el}
              </div>
            ))}
          </div>
          {sliceList.map((el, index) => (
            <div className="row" key={index}>
              {/* <div className="col">{el.fullName}</div>
              <div className="col">{`${
                el.date.getMonth() < 10
                  ? "0" + el.date.getMonth()
                  : el.date.getMonth()
              }.${
                el.date.getDate() < 10
                  ? "0" + el.date.getDate()
                  : el.date.getDate()
              }.${el.date.getFullYear()}`}</div>
              <div className="col">{el.position}</div>
              <div className="col">{el.salary}</div>
              <div className="col">{el.fop}</div> */}
              {Object.keys(headTable).map((key, idx) => (
                <div key={idx} className="col">
                  {key === "date"
                    ? `${
                        el.date.getMonth() < 10
                          ? "0" + el.date.getMonth()
                          : el.date.getMonth()
                      }.${
                        el.date.getDate() < 10
                          ? "0" + el.date.getDate()
                          : el.date.getDate()
                      }.${el.date.getFullYear()}`
                    : el[key]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pagination_wrapper">
          <ul className="pagination">
            {[...Array(list.length / countOnPage)].map((_, idx) => (
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
