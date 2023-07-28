export const useLogOut = () => {
  return () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = location.pathname.includes("operator")
        ? "/operator/auth/login"
        : "/customer/auth/login";
    }, 500);
  };
};

export const formatDate = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  return `${month}-${day}-${year}`;
};

export const formatDateTime = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const generateTimeArray = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const isPM = hour >= 12;
      const hourFormatted = (hour % 12 || 12).toString().padStart(2, "0");
      const minuteFormatted = minute.toString().padStart(2, "0");
      const period = isPM ? "PM" : "AM";
      const time = `${hourFormatted}:${minuteFormatted} ${period}`;
      times.push(time);
    }
  }
  return times;
};

export const timeArray = generateTimeArray();
