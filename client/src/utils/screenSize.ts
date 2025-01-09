import { screens } from "tailwindcss/defaultTheme";

const screenSize = {
  isSmallMobile: () => {
    const size = parseInt(screens.sm.replace("px", ""), 10);
    return window.innerWidth < size;
  },
  isMobile: () => {
    const size = parseInt(screens.md.replace("px", ""), 10);
    return window.innerWidth < size;
  },
  isTablet: () => {
    const size = parseInt(screens.lg.replace("px", ""), 10);
    return window.innerWidth < size;
  },
  isDesktop: () => {
    const size = parseInt(screens.xl.replace("px", ""), 10);
    return window.innerWidth < size;
  },
  isLargeDesktop: () => {
    const size = parseInt(screens["2xl"].replace("px", ""), 10);
    return window.innerWidth < size;
  },
};

export default screenSize;
