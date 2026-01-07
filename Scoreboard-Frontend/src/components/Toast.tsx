import { useState } from "react";
import { ToastContext } from "../Utilities/ToastContext";
import "./Toast.css";

const TOAST_DURATION = 4000;

const ToastOverlay = ({ children }: { children: React.JSX.Element }) => {
  const [message, setMessage] = useState("");

  const handleSetMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(""), TOAST_DURATION);
  };

  return (
    <ToastContext.Provider
      value={{
        toastMessage: message,
        setToastMessage: handleSetMessage,
      }}>
      {message && <div className="toast">{message}</div>}
      {children}
    </ToastContext.Provider>
  );
};

export default ToastOverlay;
