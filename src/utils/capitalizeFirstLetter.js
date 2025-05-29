const capitalizeFirst = (str) => {
  if (!str) return str; // handle empty/undefined
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export { capitalizeFirst };
