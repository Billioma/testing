export const useLogOut = () => {
  return () => {
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = "/customer/auth/login";
    }, 500);
  };
};
