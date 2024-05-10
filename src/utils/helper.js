export const formatDate = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const convertDate = (originalDate) => {
  const currentDate = new Date(originalDate);

  // Extract components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const millisecond = currentDate.getMilliseconds();

  // Create a new date
  const newDate = new Date(
    Date.UTC(year, month, day, hour, minute, second, millisecond),
  );

  // Format the date
  const formattedDate = newDate.toISOString();

  return formattedDate;
};

export const formatDates = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const trim = (str) => {
  return str?.length > 20 ? str.substring(0, 20) + "..." : str;
};

export const formatDateTime = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const trimID = (str) => {
  return str?.length > 30 ? str.substring(0, 30) + "..." : str;
};

export const useLogOut = () => {
  return () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };
};
