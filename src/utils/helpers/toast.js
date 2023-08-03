import { toast } from 'react-toastify';

export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
