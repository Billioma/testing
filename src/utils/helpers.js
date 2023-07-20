export const useLogOut = () => {
  return () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = location.pathname.includes("customer")
        ? "/customer/auth/login"
        : "/operator/auth/login";
    }, 500);
  };
};
