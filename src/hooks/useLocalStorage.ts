import { useEffect, useState } from "react";

// Works like useState, but the value is also saved in localStorage under `key`
// so it survives page refreshes and browser restarts.
function useLocalStorage<T>(key: string, initialValue: T) {
  // Passing a function to useState means localStorage is only read once,
  // on the first render, instead of on every render.
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // Saved data was broken (not valid JSON) or storage is blocked
      return initialValue;
    }
  });

  // Every time the value changes, write it back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is full or blocked (e.g. some private windows) - keep the app working
    }
  }, [key, value]);

  // "as const" keeps this typed as [value, setter] instead of a mixed array
  return [value, setValue] as const;
}

export default useLocalStorage;
