"use client";
import { useMediaQuery } from "react-responsive";

import Desktop from "./web/Desktop";
import Mobile from "./mobile/Mobile";

const Container = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  //   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isDesktopOrLaptop || isBigScreen ? <Desktop /> : <Mobile />;
};

export default Container;
