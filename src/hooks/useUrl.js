import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setUrlParam(filterValue, value) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(filterValue, value);
    setSearchParams(newParams);
  }

  return [searchParams, setUrlParam];
}
