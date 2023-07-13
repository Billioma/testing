export const useLogOut = () => {
    return () => {
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    };
  };
  