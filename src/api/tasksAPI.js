import API from "./axiosAPI";

const TASKS_PATH = '/tasks';

export const getTasks = () => API.get(TASKS_PATH);
export const createTask = (task) => API.post(TASKS_PATH, task);
export const updateTask = (id, task) => API.put(`${TASKS_PATH}/${id}`, task);
export const deleteTask = (id) => API.delete(`${TASKS_PATH}/${id}`);
