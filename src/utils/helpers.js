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
