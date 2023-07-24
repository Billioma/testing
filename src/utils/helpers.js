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

  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date, fallback = "") => {
  if (!date) return fallback;

  return new Date(date).toLocaleTimeString("default", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
