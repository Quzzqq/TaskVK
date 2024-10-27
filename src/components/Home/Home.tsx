import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeHeader from "./HomeHeader/HomeHeader";
import { IFilter } from "../../types/filterType";
import AuthStore from "../../stores/AuthStore";
import DataStore from "../../stores/DataStore";
import { observer } from "mobx-react-lite";
import HomeMain from "./HomeMain/HomeMain";
import { CircularProgress } from "@mui/material";

const Home = observer(() => {
  const [fetching, setFetching] = useState(false);
  const { token } = AuthStore;
  const { data, isLoading, getDataAction } = DataStore;
  const [openHeader, setOpenHeader] = useState(false);
  const [filters, setFilters] = useState<IFilter>({
    code: "",
    languages: [],
    inWhere: "file",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        !fetching &&
        !isLoading
      ) {
        setFetching(true);
      }
    };

    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching, isLoading]);


  useEffect(() => {
    try {
      if (fetching) {
        async function newData() {
          await getDataAction(filters, token);
        }
        newData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  }, [fetching]);


  useEffect(() => {
    !token && navigate("/registration");
  }, []);

  return (
    <>
      <HomeHeader
        filters={filters}
        setFilters={setFilters}
        token={token}
        openHeader={openHeader}
        setOpenHeader={setOpenHeader}
      />
      <HomeMain data={data} />
      {isLoading && (
        <CircularProgress color="secondary" className={styles.loading} />
      )}
    </>
  );
});
export default Home;
