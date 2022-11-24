import axios from "axios";

const url = 'https://blinkwworkx-project-backend.onrender.com/'

export const GetAllOrders = async () => {
  try {
    const res = await axios.get(`${url}api/order`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const GetAllProducts = async () => {
  try {
    const res = await axios.get(`${url}api/product`);
    // console.log(res.data);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const AddOrder = async (data) => {
  try {
    await axios.post(`${url}api/order`, data, {
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
    await axios.put(`${url}api/order/${id}`, data, {
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
    await axios.delete(`${url}api/order/${id}`);

    return true;
  } catch (error) {
    return false;
  }
};
