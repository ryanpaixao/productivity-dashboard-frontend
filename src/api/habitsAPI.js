import API from "./axiosAPI";

const HABITS_PATH = '/habits';

export const getHabits = () => API.get(HABITS_PATH);
export const createHabit = (habit) => API.post(HABITS_PATH, habit);
export const updateHabit = (id, habit) => API.put(`${HABITS_PATH}/${id}`, habit);
export const toggleHabit = (id, completed) => API.patch(`${HABITS_PATH}/${id}/toggle`, { completed });
export const deleteHabit = (id) => API.delete(`${HABITS_PATH}/${id}`);
