import React from "react";
import { useForm } from "react-hook-form";
import "./CreateFom.scss";

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("fop", { required: true })}
        />
        <label>ФОП статус</label>
      </div>

      <button className="submit_button" type="submit">
        Готово
      </button>
    </form>
  );
}
