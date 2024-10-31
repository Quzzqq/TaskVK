import { Button } from "@mui/material";
import { IData } from "../../../types/dataType";
import styles from "./HomeMain.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import DataStore from "../../../stores/DataStore";
import { useEffect } from "react";

const HomeMain = observer(({ dataStore }) => {
  const { data, deleteCurrentData } = dataStore ?? DataStore;

  const deleteData = (item: IData) => {
    deleteCurrentData(item);
  };

  return (
    <div className={styles.block}>
      {data.length !== 0 &&
        data?.map((elem, index) => (
          <div className={styles.elemArea} key={`${elem.git_url}_${index}`}>
            <CloseIcon
              className={styles.btnClose}
              onClick={() => deleteData(elem)}
              role="button"
              data-testid="close"
            ></CloseIcon>
            <h3 role="heading">{elem.name}</h3>
            <div className={styles.ownerArea}>
              <p className={styles.ownerName}>Автор:</p>
              <a
                href={`${elem.repository.owner.html_url}`}
                target="_blank"
                className={styles.ownerNameUrl}
              >
                {elem.repository.name}
              </a>
              <img
                src={elem.repository.owner.avatar_url}
                alt=""
                className={styles.imgOwner}
              />
            </div>
            <a href={elem.html_url} target="_blank" className={styles.aLink}>
              <Button
                variant="contained"
                className={styles.btnLink}
                sx={{ fontFamily: "Montserrat" }}
              >
                Перейти
              </Button>
            </a>
          </div>
        ))}
    </div>
  );
});
export default HomeMain;
