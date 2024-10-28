import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeHeader from "./HomeHeader/HomeHeader";
import { IFilter } from "../../types/filterType";
import AuthStore from "../../stores/AuthStore";
import DataStore from "../../stores/DataStore";
import { observer } from "mobx-react-lite";
import HomeMain from "./HomeMain/HomeMain";
import { Alert, CircularProgress } from "@mui/material";
import { alertManyRequests, alertNotFound } from "../Alerts/Alerts";

const Home = observer(() => {
  const headerRef = useRef(null);
  const [fetching, setFetching] = useState(false);
  const { token } = AuthStore;
  const {
    data,
    isLoading,
    getDataAction,
    maxCount,
    notFound,
    restartNotFound,
  } = DataStore;
  const [openHeader, setOpenHeader] = useState(true);
  const [filters, setFilters] = useState<IFilter>({
    code: "",
    languages: [],
    inWhere: "file",
  });
  const [tempAlert, setTempAlert] = useState(false);
  const [manyAlerts, setManyAlerts] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          900 &&
        !fetching &&
        !isLoading &&
        !maxCount
      ) {
        setFetching(true);
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [fetching, isLoading]);

  const handleClickOutside = (event) => {
    console.log(headerRef.current.contains(event.target));
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target) &&
      !event.target.classList.contains("MuiSvgIcon-root")
    ) {
      setOpenHeader(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetching) {
          await getDataAction(filters, token);
        }
      } catch (err) {
        if (err.status === 403) {
          setManyAlerts(true);
        }
        console.log(err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [fetching]);

  useEffect(() => {
    !token && navigate("/registration");
  }, []);

  useEffect(() => {
    let timeoutId;
    if (notFound) {
      setTempAlert(true);
      timeoutId = setTimeout(() => {
        setTempAlert(false);
      }, 3000);
    }
    if (manyAlerts) {
      timeoutId = setTimeout(() => {
        setManyAlerts(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [notFound, manyAlerts]);

  return (
    <>
      {manyAlerts && alertManyRequests()}
      {tempAlert && alertNotFound()}
      <div ref={headerRef}>
        <HomeHeader
          filters={filters}
          setFilters={setFilters}
          token={token}
          openHeader={openHeader}
          setOpenHeader={setOpenHeader}
          setManyAlerts={setManyAlerts}
          setFetching={setFetching}
        />
      </div>
      <HomeMain />
      {isLoading && (
        <CircularProgress color="secondary" className={styles.loading} />
      )}
      {!notFound && maxCount && (
        <div className={styles.maxCount}>Больше нет данных</div>
      )}
    </>
  );
});
export default Home;
