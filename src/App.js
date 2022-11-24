import React, { useState, useEffect, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { GetAllOrders, GetAllProducts } from "./Api";
import Modal from "./components/Modal";
import OrderItem from "./components/OrderItem";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef(null);

  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    const orders = await GetAllOrders();
    const products = await GetAllProducts();

    setAllOrders(orders);
    setFilteredOrders(orders);
    setAllProducts(products);
  };

  const handleFilter = (filterValue) => {
    console.log(filterValue);
    if (filterValue.length > 0) {
      let temp = allOrders.filter((curr) =>
        curr.Id.toString().includes(filterValue) ||
        curr.orderDescription.toString().includes(filterValue)
          ? curr
          : null
      );

      console.log(temp);

      setFilteredOrders(temp);
    } else {
      setFilteredOrders(allOrders);
    }
  };

  useOnClickOutside(wrapperRef, () => showModal && setShowModal(false));

  return (
    <div className="p-12 3xl:p-10 2xl:p-10 lg:px-0">
      <div className="flex justify-center items-center gap-10 md:px-10 md:flex-col md:gap-3">
        <h1 className="text-[48px] font-semibold my-auto md:w-full md:text-[32px] md:text-center xs:text-[26px]">Order Management</h1>
        <input
          className="h-6 outline px-3 py-4 mt-7 rounded w-1/5 3xl:w-1/5 2xl:w-2/5 lg:w-1/5 md:w-4/6 md:mt-0 sm:w-full"
          type="text"
          placeholder="search by order id or description..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            handleFilter(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col w-1/3 mx-auto mt-10 3xl:w-3/6 2xl:w-4/6 lg:w-10/12 lg:px-20 md:px-0 sm:w-full sm:px-10 ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full md:scale-90">
                <thead className="border-b">
                  <tr className="border-x-2 border-t-2">
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-5 py-4 text-left"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Order description
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Counts of Products
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left flex"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length ? (
                    filteredOrders.map((singleOrder) => (
                      <OrderItem
                        singleOrder={singleOrder}
                        fetchingData={fetchingData}
                      />
                    ))
                  ) : filter.length > 0 ? (
                    <tr className="border-b border-x-2">
                      <td className="text-center py-2" colSpan="4">
                        No Data Matched!
                      </td>
                    </tr>
                  ) : (
                    <tr className="border-b border-x-2 w-full">
                      <td
                        className="text-center py-2 animate-spin mx-auto"
                        colSpan="4"
                      >
                        <svg
                          className="w-6 text-black text-center mx-auto"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out mt-5 md:w-full md:mx-auto"
            onClick={() => setShowModal(true)}
          >
            New Order
          </button>
        </div>
        {showModal ? (
          <>
            <Modal
              wrapperRef={wrapperRef}
              setShowModal={setShowModal}
              allProducts={allProducts}
              fetchingData={fetchingData}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
