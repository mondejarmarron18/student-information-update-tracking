import { GiAstronautHelmet } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-full w-full animate-pulse z-50 fixed top-0 left-0">
      <GiAstronautHelmet className="w-[100px] h-[100px]" />
      <p className="font-semibold">Please wait, loading...</p>
    </div>
  );
};

export default Loading;
