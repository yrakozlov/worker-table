import { WORKER_LIST } from "../actionTypes/workerListActionType";

export function getWorkerList() {
  return {
    type: WORKER_LIST.GET_WORKER_LIST,
  };
}

export function changePage(data) {
  return {
    type: WORKER_LIST.CHANGE_PAGE,
    payload: {
      data,
    },
  };
}

export function changeCountOnPage(data) {
  return {
    type: WORKER_LIST.CHANGE_COUNT_ON_PAGE,
    payload: {
      data,
    },
  };
}
