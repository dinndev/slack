import React, { useState } from "react";
import { useCreateChannelProvider } from "../../States/Reducers/CreateChannelProvider";
import { useForm } from "react-hook-form";

export default function StepOne({
  toggleStepOne,
  setToggleStepTwo,
  toggleStepTwo,
  setToggleStepOne,
}) {
  const [onChangeTitle, setOnchangeTitle] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const [_, dispatch] = useCreateChannelProvider();
  const handleToggleCreateChanel = (_) => {
    dispatch({
      type: "SET_CREATE_MODE",
      toggleCreateMode: false,
    });
  };

  const nexStep = (data) => {
    dispatch({
      type: "SET_STEP_ONE",
      channelName: data.channelTitle,
    });
    setToggleStepTwo(true);
    setToggleStepOne(false);
  };
  return (
    <>
      <h2 className="my-20 text-4xl">What's the organization name?</h2>
      <form className="flex w-1/4 items-end" onSubmit={handleSubmit(nexStep)}>
        <input
          className="mt-4 h-full bg-gray-100 border outline-none rounded-md p-3 w-4/5"
          type="text"
          name="channelTitle"
          {...register("channelTitle", {
            required: "true",
            onChange: (e) => setOnchangeTitle(e.target.value),
          })}
        />
        <button
          className={`${
            onChangeTitle !== ""
              ? "bg-gray-800 text-white"
              : "bg-gray-400 text-white"
          } w-1/5 rounded h-full ml-5 transition-all `}
          type="submit"
        >
          Next
        </button>
      </form>
      <p className="text-xs mt-10 text-gray-400">
        Changed your mind?{" "}
        <span>
          <button
            onClick={handleToggleCreateChanel}
            className="font-bold text-gray-500"
          >
            Close this window
          </button>
        </span>
      </p>
    </>
  );
}
