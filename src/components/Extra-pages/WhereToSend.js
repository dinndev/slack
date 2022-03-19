import React, { useState } from "react";
import { useCreateChannelProvider } from "../../States/Reducers/CreateChannelProvider";
import { useForm } from "react-hook-form";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useAuthProvider } from "../../States/AuthProvider";
import { useComposeMessageProvider } from "../../States/Reducers/ComposeMessageProvider";

import axios from "axios";
import env from "react-dotenv";
export default function StepTwo({
  toggleStepOne,
  setToggleStepTwo,
  toggleStepTwo,
  setToggleStepOne,
}) {
  const [onChangeTitle, setOnchangeTitle] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [{ isCreateMode }, dispatch] = useComposeMessageProvider();
  const [{ users }] = useComposeMessageProvider();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const [{ user }] = useAuthProvider();

  const handleToggleCompose = () => {
    dispatch({
      type: "SET_COMPOSE_MODE",
      isCreateMode: false,
    });
  };
  const nexStep = (data) => {
    const id = users.filter(({ email }) => email === data.email)[0]?.id;
    if (!id) {
      setError("user does not exist");
    } else {
      dispatch({
        type: "SET_RECIEVER",
        recieverId: id,
      });
      setToggleStepTwo(true);
      setToggleStepOne(false);
    }
  };
  return (
    <>
      {error !== "" && (
        <Alert status="error">
          <AlertIcon />
          {`${error}`}
        </Alert>
      )}
      <h2 className="my-20 font-bold  text-4xl">Where to send the message? </h2>
      <form className="flex w-2/5 items-end" onSubmit={handleSubmit(nexStep)}>
        <input
          className="mt-4 h-full bg-gray-100 border outline-none rounded-md p-3 w-4/5"
          type="email"
          name="email"
          {...register("email", {
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
          Submit
        </button>
      </form>
      <p className="text-xs mt-10 text-gray-400">
        Changed your mind?{" "}
        <span>
          <button
            onClick={handleToggleCompose}
            className="font-bold text-gray-500"
          >
            Close this window
          </button>
        </span>
      </p>
    </>
  );
}
