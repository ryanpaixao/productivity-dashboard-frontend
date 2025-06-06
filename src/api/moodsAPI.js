import API from "./axiosAPI";

const MOODS_PATH = '/moods';

export const getMoods = () => API.get(MOODS_PATH);
export const getMoodsDateRange = (userId, startDate, endDate) => API.get(`${MOODS_PATH}/date-range?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
export const getPaginatedMoods = (userId, page = 1, limit = 15) => API.get(`${MOODS_PATH}/paginated?userId=${userId}&page=${page}&limit=${limit}`);
export const getMoodTrends = (userId, timeframe = 'daily') => API.get(`${MOODS_PATH}/trends/${timeframe}?userId=${userId}`);
export const createMood = (mood) => API.post(MOODS_PATH, mood);
export const updateMood = (id, mood) => API.put(`${MOODS_PATH}/${id}`, mood);
export const deleteMood = (id) => API.delete(`${MOODS_PATH}/${id}`);
