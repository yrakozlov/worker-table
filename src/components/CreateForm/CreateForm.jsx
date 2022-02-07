import React from "react";
import { useForm } from "react-hook-form";

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="fullName"
        {...register("fullName", { required: true })}
      />
      <input
        type="text"
        placeholder="position"
        {...register("position", { required: true })}
      />
      <input
        type="number"
        placeholder="salary"
        {...register("salary", { required: true })}
      />
      <input
        type="checkbox"
        placeholder="fop"
        {...register("fop", { required: true })}
      />

      <input type="submit" />
    </form>
  );
}
