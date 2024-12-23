import { LazyExoticComponent, Suspense } from "react";

const SuspenseWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>,
  loading?: JSX.Element
) => {
  return (
    <Suspense
      fallback={
        loading || (
          <div className="w-full h-full flex justify-center items-center">
            Loading...
          </div>
        )
      }
    >
      <Component />
    </Suspense>
  );
};

export default SuspenseWrapper;
