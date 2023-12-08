export const useLogOut = () => {
  return () => {
    const clearAndRedirect = (path) => {
      localStorage.removeItem(path);
      window.location.href = `/${path}/auth/login`;
    };

    const pathPrefix =
      location.pathname.match(/(operator|admin|client)\//)?.[0] || "customer";
    const newPath = pathPrefix?.replace("/", "");

    if (pathPrefix) {
      clearAndRedirect(newPath);
    } else {
      clearAndRedirect("customer");
    }
  };
};

export const trim = (str) => {
  return str?.length > 20 ? str.substring(0, 20) + "..." : str;
};

export const formatDate = (date, fallback = "", withTime = false) => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getUTCFullYear();
  const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getUTCDate().toString().padStart(2, "0");

  const hours = formattedDate.getUTCHours().toString().padStart(2, "0");
  const minutes = formattedDate.getUTCMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${withTime ? `${hours}:${minutes}` : ""}`;
};

export const formatNewDate = (date, fallback = "", withTime = false) => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  const hours = formattedDate.getHours().toString().padStart(2, "0");
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  // const seconds = formattedDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${withTime ? `${hours}:${minutes}` : ""}`;
};

export const formatFilterDate = (date, fallback = "", withTime = false) => {
  if (!date) return fallback;

  const formattedDate = new Date(date);

  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formattedDate.getDate().toString().padStart(2, "0");

  const hours = formattedDate.getHours().toString().padStart(2, "0");
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0");
  // const seconds = formattedDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}${withTime ? `${hours}:${minutes}` : ""}`;
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

export const formatTimes = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
    second: undefined,
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

export const formatTimees = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

export const formatMinute = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    minute: "numeric",
  });
};

export const formatHour = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    hour: "numeric",
    hour12: false,
  });
};

export const formatTimeMinute = (date, fallback = "") => {
  if (!date) return fallback;

  const currentMinutes = date.getMinutes();
  const roundedMinutes = Math.floor(currentMinutes / 15) * 15;
  const nextRoundedMinutes = roundedMinutes + 15;

  const roundedDate = new Date(date);
  if (currentMinutes >= roundedMinutes) {
    roundedDate.setMinutes(nextRoundedMinutes);
  } else {
    roundedDate.setMinutes(roundedMinutes);
  }

  return roundedDate.toLocaleTimeString("default", {
    minute: "numeric",
  });
};

export const formatFullDate = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return formattedDate.toLocaleString("default", options);
};

export const formatDateTime = (date, fallback = "") => {
  if (!date) return fallback;

  const formattedDate = new Date(date);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return formattedDate.toLocaleString("default", options);
};

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

export const formatDateToISOString = (date) => {
  const newDate = new Date(date);

  const year = newDate.getUTCFullYear();
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(newDate.getUTCDate()).padStart(2, "0");
  const hours = String(newDate.getUTCHours()).padStart(2, "0");
  const minutes = String(newDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(newDate.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(newDate.getUTCMilliseconds()).padStart(3, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  return formattedDate;
};
