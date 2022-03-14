import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { animated } from "react-spring";

export default function Auth({
  setToggleLogin,
  transtionLogin,
  transtionSignup,
  setToggleSignup,
  isSignupOpen,
  toggleLogin,
  setCurrentUser
}) {
  return (
    <>
      {transtionLogin(
        (style, item) =>
          item && (
            <animated.div
              className="w-2/4 relative bg-white flex items-center justify-between flex-col h-screen"
              style={style}
            >
              <Login
                setToggleSignup={setToggleSignup}
                toggleLogin={toggleLogin}
                setToggleLogin={setToggleLogin}
                setCurrentUser={setCurrentUser} 
              />
            </animated.div>
          )
      )}
      {transtionSignup(
        (style, item) =>
          item && (
            <animated.div
              className="w-3/5 relative bg-white flex items-center justify-between flex-col h-screen"
              style={style}
            >
              <Signup
                setToggleSignup={setToggleSignup}
                isSignupOpen={isSignupOpen}
                setToggleLogin={setToggleLogin}
              />
            </animated.div>
          )
      )}
    </>
  );
}
