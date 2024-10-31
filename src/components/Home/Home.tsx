import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeHeader from "./HomeHeader/HomeHeader";
import { IFilter } from "../../types/filterType";
import { observer } from "mobx-react-lite";
import HomeMain from "./HomeMain/HomeMain";
import { Alert, CircularProgress } from "@mui/material";
import { alertManyRequests, alertNotFound } from "../Alerts/Alerts";
import DataStore from "../../stores/DataStore";
import AuthStore from "../../stores/AuthStore";

const Home = observer(({ dataStore, authStore }) => {
  const [fetching, setFetching] = useState(false);
  const { token } = authStore ?? AuthStore;
  const {
    data,
    isLoading,
    getDataAction,
    maxCount,
    notFound,
    restartNotFound,
  } = dataStore ?? DataStore;
  const [openHeader, setOpenHeader] = useState(false);
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
    <div data-testId="home">
      {manyAlerts && alertManyRequests()}
      {tempAlert && alertNotFound()}
      <HomeHeader
        filters={filters}
        setFilters={setFilters}
        token={token}
        openHeader={openHeader}
        setOpenHeader={setOpenHeader}
        setManyAlerts={setManyAlerts}
        setFetching={setFetching}
      />
      {data.length === 0 ? (
        <div className={styles.makeRequest} data-testId="empty-data">
          <p>Тут пока пусто!</p>
          <img src={"/sad.png"} alt="Sad Smile" style={{ width: "400px" }} />
        </div>
      ) : (
        <HomeMain dataStore={dataStore}/>
      )}

      {isLoading && (
        <CircularProgress color="secondary" className={styles.loading} />
      )}
      {!notFound && maxCount && (
        <div className={styles.maxCount}>Больше нет данных</div>
      )}
    </div>
  );
});
export default Home;
