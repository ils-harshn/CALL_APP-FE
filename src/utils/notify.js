import { toast } from "react-toastify";

const toastConfig = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "Toaster",
};

const notify = {
  success: (message, config = {}) => {
    toast.success(message, { ...toastConfig, ...config });
  },
  error: (message, config = {}) => {
    toast.error(message, { ...toastConfig, ...config });
  },
  info: (message, config = {}) => {
    toast.info(message, { ...toastConfig, ...config });
  },
};

export default notify;
