import API from "./axios";

const MOODS_PATH = '/moods';

export const getMoods = () => API.get(MOODS_PATH);
export const createMood = (mood) => API.post(MOODS_PATH, mood);
export const updateMood = (id, mood) => API.put(`${MOODS_PATH}/${id}`, mood);
export const deleteMood = (id) => API.delete(`${MOODS_PATH}/${id}`);
