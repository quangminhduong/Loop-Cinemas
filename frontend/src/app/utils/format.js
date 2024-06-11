export const FormatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthIndex = date.getMonth(); // Months are 0-based, so adding 1
  const year = date.getFullYear() % 100; // Extract the last two digits of the year

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Create the formatted string
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export const FormatTime24Hours = (dateString) => {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Adding leading zeros if necessary
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Create the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
};
