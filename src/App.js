import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import Logo from "./Logo";

function App() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [isSignupOpen, setToggleSignup] = useState(true);
  const [toggleHero, setHero] = useState(true);
  // Create transition for login
  const transtionLogin = useTransition(toggleLogin, {
    from: { x: -100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -100, y: 0, opacity: 0 },
    config: {
      mass: 1,
      tension: 500,
      friction: 35,
      clamp: true,
    },
  });
  // Create transition for signup
  const transtionSignup = useTransition(isSignupOpen, {
    from: { x: -100, y: 0, display: "none" },
    enter: { x: 0, y: 0, display: "flex" },
    leave: { display: "none" },
    config: {
      mass: 1,
      tension: 500,
      friction: 0,
      clamp: true,
    },
  });
  const transtionHero = useTransition(toggleHero, {
    from: { x: -200, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: -200, y: 0, opacity: 0 },
  });
  const handeleToggleLogin = (_) => {
    setToggleSignup(!isSignupOpen);
  };
  return (
    <div className="w-full bg-gray-600 flex justify-between">
      {transtionLogin(
        (style, item) =>
          item && (
            <animated.div
              className="w-1/2 bg-white flex items-center justify-between flex-col h-screen"
              style={style}
            >
              <Login
                setToggleSignup={setToggleSignup}
                toggleLogin
                setToggleLogin={setToggleLogin}
              />
            </animated.div>
          )
      )}
      {transtionSignup(
        (style, item) =>
          item && (
            <animated.div
              className="w-3/5 bg-white flex items-center justify-between flex-col h-screen"
              style={style}
            >
              <Signup
                setToggleSignup={setToggleSignup}
                isSignupOpen
                setToggleLogin={setToggleLogin}
              />
            </animated.div>
          )
      )}
      {transtionHero(
        (style, item) =>
          item && (
            <animated.div
              className=" text-white flex items-center justify-between flex-col h-screen"
              style={style}
            >
              <Logo />
            </animated.div>
          )
      )}
    </div>
  );
}

export default App;
