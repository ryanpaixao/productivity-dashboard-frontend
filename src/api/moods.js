import axios from 'axios';

const API_URL = 'http://localhost:5000/api/moods';

export const getMoods = () => axios.get(API_URL);
export const createMood = (mood) => axios.post(API_URL, mood);
export const updateMood = (id, mood) => axios.put(`${API_URL}/${id}`, mood);
export const deleteMood = (id) => axios.delete(`${API_URL}/${id}`);
