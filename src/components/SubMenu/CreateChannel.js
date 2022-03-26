import React, { useState, useEffect, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import StepOne from "../Extra-pages/StepOne";
import axios from "axios";
import StepTwo from "../Extra-pages/StepTwo";
import env from "react-dotenv";
import { useCreateChannelProvider } from "../../States/Reducers/CreateChannelProvider";
import { useAuthProvider } from "../../States/AuthProvider";
export default function CreateChannel() {
  const [toggleStepOne, setToggleStepOne] = useState(true);
  const [toggleStepTwo, setToggleStepTwo] = useState(false);
  const [{ user }] = useAuthProvider();

  const transtionStepOne = useTransition(toggleStepOne, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 500,
      friction: 30,
      clamp: true,
    },
  });
  // Create transition for signup
  const transtionStepTwo = useTransition(toggleStepTwo, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 500,
      friction: 30,
      clamp: true,
    },
  });
  return (
    <div className="flex z-10 w-screen bg-white h-full absolute">
      {transtionStepOne(
        (style, item) =>
          item && (
            <animated.div
              className="w-full transition-all text-black flex-col bg-white flex items-center h-screen"
              style={style}
            >
              <StepOne
                setToggleStepOne={setToggleStepOne}
                toggleStepOne={toggleStepOne}
                setToggleStepTwo={setToggleStepTwo}
                toggleStepTwo={toggleStepTwo}
              />
            </animated.div>
          )
      )}
      {transtionStepTwo(
        (style, item) =>
          item && (
            <animated.div
              className="w-full text-black flex-col bg-white flex items-center h-screen"
              style={style}
            >
              <StepTwo
                setToggleStepOne={setToggleStepOne}
                toggleStepOne={toggleStepOne}
                setToggleStepTwo={setToggleStepTwo}
                toggleStepTwo={toggleStepTwo}
              />
            </animated.div>
          )
      )}
    </div>
  );
}
