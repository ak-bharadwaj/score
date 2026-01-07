import { createContext } from "react";

export const ToastContext = createContext({
  toastMessage: "",
  setToastMessage: (str: string) => {},
});
