import axios from "axios";

const API_URL = "https://hemspire-fullstack.onrender.com/api/poems";

export const getAllPoems = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const searchPoems = async (keyword) => {
  try {
    const res = await axios.get(`${API_URL}/search?keyword=${keyword}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
