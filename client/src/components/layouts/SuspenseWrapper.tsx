import { LazyExoticComponent, Suspense } from "react";
import Loading from "../common/Loading";

const SuspenseWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>,
  loading?: JSX.Element
) => {
  return (
    <Suspense fallback={loading || <Loading />}>
      <Component />
    </Suspense>
  );
};

export default SuspenseWrapper;
