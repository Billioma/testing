import React, { Suspense } from "react";

const Loader = () => {
  return <div className="lds-dual-ring"></div>;
};
const WithSuspense = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default WithSuspense;
