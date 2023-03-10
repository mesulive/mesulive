import { getScreenType, ScreenType } from "@mesulive/ui";
import { useEffect, useState, useTransition } from "react";

export const useWindowSize = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [, startTransaction] = useTransition();

  useEffect(() => {
    const handleResize = () =>
      startTransaction(() => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
export const useScreenType = (initialValue?: ScreenType) => {
  const [screenType, setScreenType] = useState<ScreenType>(
    initialValue ?? ScreenType.mobile
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenType(getScreenType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
};
