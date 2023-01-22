import { useRef } from "react";

export const useCancelToken = (): [{ cancelled: boolean }, () => void] => {
  const token = useRef({ cancelled: false });
  const cancel = () => (token.current.cancelled = true);
  return [token.current, cancel];
};
