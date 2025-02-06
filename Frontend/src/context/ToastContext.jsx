import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

// Create context
const ToastContext = createContext();

// Custom hook for easy access
export const useToast = () => useContext(ToastContext);

// Provider component
export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
}
