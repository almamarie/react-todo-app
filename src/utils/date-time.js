export const extractDateAndTime = (dateString) => {
  const date = new Date(dateString);

  const datePart =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const timePart =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return [datePart, timePart];
};

export const isAMorPM = (dateString) => {
  const date = new Date(dateString);
  const hour = date.getHours();

  if (hour < 12) {
    return "am";
  } else {
    return "pm";
  }
};
