import React from "react";
import { useState } from "react";

const ProductItem = ({
  productName,
  desc,
  index,
  allProducts,
  selectedProducts
}) => {
  const [check, setCheck] = useState(true);

  //passing the product to selectedProducts function which got checked/selected
  const handleOnChange = (index) => {
    setCheck(!check);

    selectedProducts(allProducts[index],check)
  };

  return (
    <div className={`flex justify-between ${index} === 0 ? mb-5 : mt-0 `}>
      <input
        type="checkbox"
        className="scale-125 mr-3 cursor-pointer"
        value={check}
        onChange={() => handleOnChange(index)}
      />
      <div className="w-full border-2 border-black p-3 rounded">
        <h1 className="text-md text-green-600 font-semibold">{productName}</h1>
        <h3 className="text-sm"> {desc}</h3>
      </div>
    </div>
  );
};

export default ProductItem;
