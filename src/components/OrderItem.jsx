import React, { useState } from "react";
import Swal from "sweetalert2";
import { DeleteOrder, EditOrder } from "../Api";

const OrderItem = ({ singleOrder, fetchingData }) => {
  const [edit, SetEdit] = useState(false);
  const [editDesc, setEditDesc] = useState(singleOrder.orderDescription);

  const handleEdit = () => {
    SetEdit(!edit);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await DeleteOrder(singleOrder.Id);

        if (res) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Order Deleted!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            fetchingData();
            SetEdit(false);
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Failed To delete the order, please try again.",
            showConfirmButton: false,
            timer: 1500,
          });
          SetEdit(false);
        }
      }
    });
  };

  const handleSaveEdit = async () => {
    if (editDesc.length > 0) {
      const res = await EditOrder(
        { orderDescription: editDesc },
        singleOrder.Id
      );

      if (res) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Edited Order Saved!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          fetchingData();
          SetEdit(false);
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed To edit the order, please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        SetEdit(false);
      }
    } else {
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: "Order Description cant be empty!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setEditDesc(singleOrder.orderDescription);
        SetEdit(false);
      });
    }
  };

  //converting JSON string into an array and removing extra chars from that array
  let productsLength = [...singleOrder.productIdArray].filter((curr) => curr !== "[" && curr !== "," && curr !== "]" ? curr : null)

  return (
    <tr className="border-b border-x-2">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {singleOrder.Id}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {edit ? (
          <>
            <input
              className="border-2 px-1"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              type="text"
            />
          </>
        ) : (
          singleOrder.orderDescription
        )}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {productsLength.length}
      </td>
      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap flex justify-around items-center">
        {edit ? (
          <>
            <span title="Save Edit" onClick={handleSaveEdit}>
              <svg
                className="w-6 mt-1 cursor-pointer bg-green-500 p-1 text-white rounded shadow"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                />
              </svg>
            </span>
            <span
              title="Cancel Edit"
              onClick={() => {
                setEditDesc(singleOrder.orderDescription);
              }}
              className="md:mx-3"
            >
              <svg
                className="w-6 mt-1 cursor-pointer bg-red-500 p-1 text-white rounded shadow"
                viewBox="0 0 24 24"
                onClick={() => SetEdit(false)}
              >
                <path
                  fill="currentColor"
                  d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"
                />
              </svg>
            </span>
          </>
        ) : (
          <span title="Edit Order">
            <svg
              className="w-6 mt-1 cursor-pointer bg-yellow-500 p-1 text-white rounded shadow md:mr-3"
              viewBox="0 0 24 24"
              onClick={handleEdit}
            >
              <path
                fill="currentColor"
                d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z"
              />
            </svg>
          </span>
        )}
        <span title="Delete order">
          <svg
            className="w-6 cursor-pointer bg-blue-500 p-1 text-white rounded shadow mt-1"
            viewBox="0 0 24 24"
            onClick={handleDelete}
          >
            <path
              fill="currentColor"
              d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
