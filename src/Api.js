import axios from "axios";

export const GetAllOrders = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/order");
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetAllProducts = async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/product");
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const AddOrder = async (data) => {
  try {
    const res = await axios.post("http://localhost:4000/api/order", data, {
      "Content-Type": "application/json",
    });
    // console.log(res.data);

    return true;
  } catch (error) {
    return false;
  }
};

export const EditOrder = async (data, id) => {
  try {
    const res = await axios.put(`http://localhost:4000/api/order/${id}`, data, {
      "Content-Type": "application/json",
    });
    // console.log(res.data);

    return true;
  } catch (error) {
    return false;
  }
};

export const DeleteOrder = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:4000/api/order/${id}`);

    return true;
  } catch (error) {
    return false;
  }
};
