import React from "react";
import { useState } from "react";
import ProductItem from "./ProductItem";
import Swal from "sweetalert2";
import { AddOrder,GetAllOrders } from "../Api/Api";

const Modal = ({
  wrapperRef,
  setShowModal,
  allProducts ,
  fetchingData
}) => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [orderDesc, setOrderDesc] = useState("");

  //this function will handle those checked products
  const selectedProducts = (index, checked) => {
    let temp1 = addedProducts;

    if (checked) {
      temp1.push(index);
    } else {
      let temp2 = [];

      temp2 = temp1.filter((curr) => curr !== index);

      temp1 = temp2;
    }
    setAddedProducts(temp1);
  };

  //to add new order
  const handleSubmit = async () => {
    if (addedProducts.length > 0 && orderDesc.length > 0) {
      const res = await AddOrder({ orderDescription:orderDesc, addedProducts });

      if (res) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Order Placed!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          GetAllOrders();
          fetchingData();
          setShowModal(false);
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed To Place the order, please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModal(false);
      }
    } else {
      setShowModal(true);

      if (orderDesc.length > 0) {
        Swal.fire({
          position: "top-center",
          icon: "info",
          title: "Please Select a Product",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "info",
          title: "Please Enter a Order Description",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="w-2/6 lg:w-1/2 md:scale-75 md:w-full sm:scale-90 md:overflow-hidden mx-auto flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none absolute"
    >
      <div className="my-6 mx-auto w-full">
        <div className="border-0 rounded-lg shadow-lg flex flex-col bg-slate-200 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-solid border-gray-300 rounded-t ">
            <h3 className="text-3xl font=extrabold">New Order</h3>
            <button
              className="bg-transparent border-0 float-right bg-red-400 rounded-full px-2 font-semibold text-white"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          </div>
          <div className="px-6">
            <input
              className="h-6 outline px-3 py-4 mt-1 rounded w-full"
              type="text"
              placeholder="order description..."
              value={orderDesc}
              onChange={(e) => setOrderDesc(e.target.value)}
            />
          </div>

          <div className="p-6 flex-auto">
            <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full h-80 overflow-auto">
              {allProducts.length
                ? allProducts.map((singleProduct, index) => (
                    <ProductItem
                      key={index}
                      productName={singleProduct.productName}
                      desc={singleProduct.productDescription.desc}
                      index={index}
                      allProducts={allProducts}
                      selectedProducts={selectedProducts}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className="w-auto flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-white bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
