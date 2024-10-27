import { Button } from "@mui/material";
import { IData } from "../../../types/dataType";
import styles from "./HomeMain.module.css";

const HomeMain = ({ data }: { data: IData[] }) => {
  return (
    <div className={styles.block}>
      {data.length !== 0 &&
        data?.map((elem) => (
          <div className={styles.elemArea} key={elem.name}>
            <h3>{elem.name}</h3>
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
            <a href={elem.html_url} target="_blank">
              <Button
                variant="contained"
                className={styles.btnLink}
                sx={{ position: "absolute" }}
              >
                Перейти
              </Button>
            </a>
          </div>
        ))}
    </div>
  );
};
export default HomeMain;
