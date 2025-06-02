const DATE_GRANULARITY = {
  // INTER_DAY: 'interday',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

const NUM_OF_DAYS = {
  interday: 1,
  daily: 30,
  weekly: 30 * 6,
  monthly: 366,
  yearly: 366 * 5
};

export default DATE_GRANULARITY;
export { NUM_OF_DAYS };
