export const convertTimeStampToDate = (timestamp: number | undefined): string | null => {
  if (!timestamp) return null;
  const houers = new Date(timestamp * 1000).getHours();
  const minutes = new Date(timestamp * 1000).getMinutes();
  return `${houers}:${minutes}`;
};

export const numbersToDay = {
  0: "Sunday",
  1: "Monday",
  2: "Thusday",
  3: "Wensday",
  4: "Thursday",
  5: "Friday",
  6: "Saterday",
};
