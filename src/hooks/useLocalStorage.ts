import { useEffect, useState } from "react";

const useLocalStorage = (storageKey = "search") => {
  const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key) ?? "";
  };

  const setToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const [storageVal, setStorageVal] = useState(getFromLocalStorage(storageKey));

  useEffect(() => {
    setToLocalStorage(storageKey, storageVal);
  }, [storageKey, storageVal]);

  return [storageVal, setStorageVal] as const;
};

export default useLocalStorage;
