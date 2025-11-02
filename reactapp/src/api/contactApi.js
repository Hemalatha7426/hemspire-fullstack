import axios from "axios";

const BASE_URL = "https://hemspire-fullstack.onrender.com/api/contact";

export const submitFeedback = (data) => axios.post(`${BASE_URL}/submit`, data);

export const getAllFeedback = () => axios.get(`${BASE_URL}/admin`);

export const searchFeedback = (keyword) =>
  axios.get(`${BASE_URL}/admin/search`, { params: { keyword } });

export const deleteFeedback = (id) => axios.delete(`${BASE_URL}/admin/${id}`);
