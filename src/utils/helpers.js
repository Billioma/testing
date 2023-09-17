export const useLogOut = () => {
  return () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = location.pathname.includes("operator")
        ? "/operator/auth/login"
        : (window.location.href = location.pathname.includes("admin")
            ? "/admin/auth/login"
            : (window.location.href = location.pathname.includes("client")
                ? "/client/auth/login"
                : "/customer/auth/login"));
    }, 500);
  };
};

export const trim = (str) => {
  return str?.length > 20 ? str.substring(0, 20) + "..." : str;
};

export const formatDate = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  return `${month}-${day}-${year}`;
};

export const formatDateHour = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const hours = formattedDate.getHours().toString().padStart(2, "0");
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  const seconds = formattedDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateTimes = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export const formatTime = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
    second: undefined,
  });
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
    for (let minute = 0; minute < 60; minute += 15) {
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

export const formatTimeToHHMMSS = (time) => {
  if (!time) {
    return "";
  }

  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":");

  if (period === "PM" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  const seconds = "00";
  return `${hours}:${minutes}:${seconds}`;
};
