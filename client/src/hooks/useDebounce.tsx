import { useEffect, useState } from "react";

/**
 * Custom hook for debouncing a value.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds for the debounce.
 * @returns The debounced value.
 */
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
