import { useTranstion, animated } from "react-spring";

export default function Animate(toggleLogin, component) {
  const transtionLogin = useTranstion(toggleLogin, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });
  console.log(component);
  return (
    <>
      test
      {/* {transtionLogin((style, item) => (
        <animated.div>{component}</animated.div>
      ))} */}
    </>
  );
}
