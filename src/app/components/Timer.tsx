import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

interface OTPTimerProps {
  duration?: number; // in seconds, default 120 (2 min)
}

export interface OTPTimerHandle {
  start: () => void;
}

const OTPTimer = forwardRef<OTPTimerHandle, OTPTimerProps>(
  ({ duration = 120 }, ref) => {
    const [timeLeft, setTimeLeft] = useState(0);

    // Expose start function to parent via ref
    useImperativeHandle(ref, () => ({
      start: () => {
        const expiry = Date.now() + duration * 1000;
        localStorage.setItem("otpExpiry", String(expiry));
        setTimeLeft(duration);
      },
    }));

    useEffect(() => {
      // On mount, check if timer is running
      const expiry = localStorage.getItem("otpExpiry");
      if (expiry) {
        const diff = Math.floor((Number(expiry) - Date.now()) / 1000);
        if (diff > 0) setTimeLeft(diff);
        else localStorage.removeItem("otpExpiry");
      }

      const interval = setInterval(() => {
        const expiry = localStorage.getItem("otpExpiry");
        if (!expiry) return;

        const diff = Math.floor((Number(expiry) - Date.now()) / 1000);
        if (diff <= 0) {
          setTimeLeft(0);
          localStorage.removeItem("otpExpiry");
        } else {
          setTimeLeft(diff);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div>
        {timeLeft > 0 && (
          <h2>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </h2>
        )}
      </div>
    );
  }
);

export default OTPTimer;
