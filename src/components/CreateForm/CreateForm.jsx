import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createWorker, editWorker } from "./../../actions/workerListAction";
import { useDispatch, useSelector } from "react-redux";
import "./CreateFom.scss";

export default function CreateForm({ handleClose, isCreate, choosenWorker }) {
  const dispatch = useDispatch();
  const { list } = useSelector(({ workerList }) => workerList);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: !isCreate ? list[choosenWorker].fullName : "",
      position: !isCreate ? list[choosenWorker].position : "",
      salary: !isCreate ? list[choosenWorker].salary : "",
      fop: list[choosenWorker].fop,
    },
  });

  const onSubmit = (data) => {
    isCreate
      ? dispatch(createWorker(data))
      : dispatch(editWorker(data, choosenWorker));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div>{isCreate ? "Нанять сотрудника" : "Редактировать"}</div>
      <div className="input_text-wrapper">
        <input
          className="input_text"
          type="text"
          placeholder="fullName"
          {...register("fullName", { required: true })}
        />
        <input
          className="input_text"
          type="text"
          placeholder="position"
          {...register("position", { required: true })}
        />
        <input
          className="input_text"
          type="number"
          placeholder="salary"
          {...register("salary", { required: true })}
        />
      </div>

      <div className="checkbox">
        <input
          className="input_checkbox"
          type="checkbox"
          placeholder="fop"
          {...register("fop")}
        />
        <label>ФОП статус</label>
      </div>

      <button
        onClick={() => handleClose()}
        className="submit_button"
        type="submit"
        disabled={!isDirty || !isValid}
      >
        Готово
      </button>
    </form>
  );
}
