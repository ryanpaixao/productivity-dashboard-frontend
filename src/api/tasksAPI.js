import API from "./axiosAPI";

const TASKS_PATH = '/tasks';

export const getTasks = () => API.get(TASKS_PATH);
export const createTask = (task) => API.post(TASKS_PATH, task);
export const updateTask = (id, task) => API.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => API.delete(`${API_URL}/${id}`);
