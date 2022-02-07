/* eslint-disable import/no-anonymous-default-export */
import { WORKER_LIST } from "../actionTypes/workerListActionType";

const initialState = {
  list: [],
  sliceList: [],
  choosePage: 0,
  countOnPage: 10,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WORKER_LIST.GET_WORKER_LIST:
      const getPos = () => {
        const pos = [
          "Тракторист",
          "Повар",
          "Электрик",
          "Администратор",
          "Сантехник",
          "Ветеринар",
        ];
        return pos[Math.floor(Math.random() * pos.length)];
      };
      return {
        ...state,
        list: [...Array(100)].map((_, idx) => ({
          id: idx,
          fullName: `Петя${idx} Петренко Слесаренко`,
          date: new Date(2011, 1, idx + 1),
          position: getPos(),
          salary: `${idx + 1}00`,
          fop: Boolean(Math.random() < 0.5),
        })),
      };

    case WORKER_LIST.CHANGE_COUNT_ON_PAGE:
      return { ...state, countOnPage: action.payload.data };

    case WORKER_LIST.CHANGE_PAGE:
      state.choosePage = action.payload.data;
      state.sliceList = state.list.slice(
        state.countOnPage * state.choosePage,
        state.countOnPage * state.choosePage + state.countOnPage
      );
      return {
        ...state,
      };

    case WORKER_LIST.DELETE_WORKER:
      const deleteIndex = state.list.findIndex(
        (el) => el.id === action.payload.data
      );

      const startArr = state.list.slice(0, deleteIndex);

      const endArr = state.list.slice(deleteIndex + 1, state.list.length + 1);

      state.list = [...startArr, ...endArr];

      state.sliceList = state.list.slice(
        state.countOnPage * state.choosePage,
        state.countOnPage * state.choosePage + state.countOnPage
      );
      state.listLength = state.list.length;
      console.log((state.listLength / state.countOnPage) * 10);

      // state.sliceList.splice(action.payload.data, 1);

      return {
        ...state,
      };

    default:
      return state;
  }
}
