import { Toaster } from "react-hot-toast";

const colors = {
  success: {
    100: "#d1fae5",
    900: "#064e3b",
  },
  error: {
    100: "#ffe4e6",
    900: "#881337",
  },
};

const StyledToaster = () => (
  <Toaster
    toastOptions={{
      success: {
        style: {
          background: colors.success[100],
          color: colors.success[900],
        },
        iconTheme: {
          primary: colors.success[100],
          secondary: colors.success[900],
        },
      },
      error: {
        style: {
          background: colors.error[100],
          color: colors.error[900],
        },
        iconTheme: {
          primary: colors.error[100],
          secondary: colors.error[900],
        },
      },
    }}
  />
);

export default StyledToaster;
