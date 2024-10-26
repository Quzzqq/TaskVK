import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeHeader from "./HomeHeader/HomeHeader";
import { IFilter } from "../../types/filterType";

const Home = ({ token }: { token: string }) => {
  const [openHeader, setOpenHeader] = useState(false);
  const [filters, setFilters] = useState<IFilter>({
    code: "",
    languages: [],
    inWhere: "file",
  });

  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate("/registration");
  });
  return (
    <>
      <HomeHeader
        filters={filters}
        setFilters={setFilters}
        token={token}
        openHeader={openHeader}
        setOpenHeader={setOpenHeader}
      />
    </>
  );
};
export default Home;
