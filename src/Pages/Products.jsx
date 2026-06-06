import React, { Suspense, lazy } from "react";
import { Loader } from "../Components/Loader/Loader";

const ProductList = lazy(() =>
  import("../Features/Productlist/ProductList")
);

const Products = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ProductList />
      </Suspense>
    </>
  );
};

export default Products;