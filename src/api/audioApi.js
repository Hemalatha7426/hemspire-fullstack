import axios from "axios";

const API_URL = "https://hemspire-fullstack.onrender.com/api/audio";

export const getAllAudio = () => axios.get(API_URL);

export const getAudioById = (id) => axios.get(`${API_URL}/${id}`);

export const searchAudio = (keyword) => axios.get(`${API_URL}/search?keyword=${keyword}`);
