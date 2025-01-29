import { TbWorldSearch } from "react-icons/tb";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="relative">
        <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-7xl font-bold">
          !
        </span>
        <TbWorldSearch className="w-[100px] h-[100px]" />
      </div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-center max-w-lg">
        The page you’re looking for doesn’t exist or may have been moved.
        Double-check the URL or head back to the homepage.
      </p>
      <Link to="/" className="text-primary mt-4">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
