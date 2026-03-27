import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import styles from "./Toast.module.css";

const icons = {
  success: <CheckCircle className={styles.iconSuccess} size={20} />,
  error: <AlertCircle className={styles.iconError} size={20} />,
  info: <Info className={styles.iconInfo} size={20} />,
};

export function Toast({ message, type = "info", duration = 3000, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // match exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${isClosing ? styles.closing : ""}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div className={styles.iconContainer} aria-hidden="true">
        {icons[type]}
      </div>{" "}
      <div className={styles.message}>{message}</div>
      <button
        className={styles.closeButton}
        onClick={() => setIsClosing(true)}
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
    </div>
  );
}
