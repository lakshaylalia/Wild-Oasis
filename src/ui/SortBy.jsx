import Select from "./Select";

import { useUrl } from "../hooks/useUrl";

function SortBy({ options }) {
  const [searchParams, setUrlParam] = useUrl();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    setUrlParam("sortBy", e.target.value);
  }

  return <Select options={options} onChange={handleChange} value={sortBy} type="white" />;
}

export default SortBy;
