import { useEffect, useState, useRef } from "react";

export const useDelayCallback = (dependencies, timeDelay, callback) => {
  const [timeId, setTimeId] = useState(null);
  const initial = useRef(true);

  useEffect(() => {
    if (timeId) clearTimeout(timeId);

    if (!initial.current) {
      const callbackId = setTimeout(() => {
        if (callback) {
          callback();
        } else {
          clearTimeout(callbackId);
          setTimeId(null);
          throw new Error("ValueError: Callback not defined");
        }

        setTimeId(null);
      }, timeDelay);

      setTimeId(callbackId);
    }
    return () => {
      initial.current = false;
    };
  }, [...dependencies]);
};
