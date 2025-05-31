const getDateFromWeek = (year: number, week: number): Date => {
  if (year < 1970 || year > 2100) {
    throw new Error('Year must be between 1970 and 2100');
  }
  if (week < 1 || week > 53) {
    throw new Error('Week must be between 1 and 53');
  }
  
  // Create a date for January 1 of the year
  const date = new Date(year, 0, 1);

  // Get the day of week for Jan 1 (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Calculate the date of the first Sunday
  const firstSunday = new Date(date);
  firstSunday.setDate(date.getDate() - ((7 - dayOfWeek) % 7));

  // Add (week-1)*7 days to get the start of the desired week
  const result = new Date(firstSunday);
  result.setDate(firstSunday.getDate() + (week - 1) * 7);

  return result;
};

export { getDateFromWeek };
