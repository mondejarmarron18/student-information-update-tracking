import { MdErrorOutline } from "react-icons/md";

const ResourceError = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <MdErrorOutline className="w-[70px] h-[70px]" />
      <h1 className="text-xl font-bold">Oops! Something Went Wrong</h1>
      <p className="text-center max-w-lg text-sm">
        We encountered an unexpected error while trying to process your request.
        This might be caused by a temporary glitch, a problem with your
        connection, or an issue on our side.
      </p>
    </div>
  );
};

export default ResourceError;
