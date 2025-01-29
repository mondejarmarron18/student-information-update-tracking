import { TbShieldSearch } from "react-icons/tb";

const ResourceForbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <TbShieldSearch className="w-[70px] h-[70px]" />
      <h1 className="text-xl font-bold">You Don't Have Access to This Page</h1>
      <p className="text-center max-w-lg text-sm">
        It seems like you’re trying to access a page or resource that’s
        restricted.
      </p>
    </div>
  );
};

export default ResourceForbidden;
