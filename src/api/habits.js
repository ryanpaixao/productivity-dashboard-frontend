import axios from "axios";

const HABITS_PATH = '/habits';

export const getHabits = () => axios.get(HABITS_PATH);
export const createHabit = (habit) => axios.post(HABITS_PATH, habit);
export const updateHabit = (id, habit) => axios.put(`${HABITS_PATH}/${id}`, habit);
export const deleteHabit = (id) => axios.delete(`${HABITS_PATH}/${id}`);
