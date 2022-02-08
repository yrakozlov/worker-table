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

export function deleteWorker(data) {
  return {
    type: WORKER_LIST.DELETE_WORKER,
    payload: {
      data,
    },
  };
}

export function createWorker(data) {
  return {
    type: WORKER_LIST.CREATE_WORKER,
    payload: {
      data,
    },
  };
}

export function editWorker(info, choosenWorker) {
  return {
    type: WORKER_LIST.EDIT_WORKER,
    payload: {
      data: { info, choosenWorker },
    },
  };
}

export function sortWorker(data) {
  return {
    type: WORKER_LIST.SORT_WORKER,
    payload: {
      data,
    },
  };
}

export function filterWorker(data) {
  return {
    type: WORKER_LIST.FILTER_WORKER,
    payload: {
      data,
    },
  };
}

export function filterWorkerNotFop(data) {
  return {
    type: WORKER_LIST.FILTER_WORKER_NOT_FOP,
    payload: {
      data,
    },
  };
}
