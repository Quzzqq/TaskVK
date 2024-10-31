import { useEffect, useState } from "react";
import styles from "./Registration.module.css";
import { Button, TextField } from "@mui/material";
import takeToken from "../../service/checkToken";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";

const Registration = ({ signIn }: { signIn: (value: string) => void }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [mistake, setMistake] = useState<boolean>(false);
  const { token } = authStore;

  const checkToken = async () => {
    try {
      await takeToken(value);
      setMistake(false);
      localStorage.setItem("userToken", value);
      signIn(value);
      navigate("/");
    } catch (e) {
      setMistake(true);
      console.log(e);
    }
  };
  useEffect(() => {
    token && navigate("/");
  }, []);

  return (
    <div className={styles.block}>
      <h1>Поиск необходимого кода на ресурсах GitHub.</h1>
      <hr style={{ marginBottom: "15px" }} />
      <label className={styles.labelInput} htmlFor={styles.fieldToken}>
        Для продолжения вам необходимо ввести токен.
      </label>
      <br />
      <div className={styles.areaField}>
        <TextField
          error={mistake}
          helperText={mistake ? "Неверный токен" : ""}
          style={{ width: "60%" }}
          id={styles.fieldToken}
          label="Токен"
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="contained"
          href="#contained-buttons"
          className={styles.btn}
          style={{ marginTop: "10px", marginLeft: "50px" }}
          onClick={checkToken}
          role="button"
        >
          Отправить
        </Button>
      </div>
      <div className={styles.info}>
        <div className={styles.infoToken}>
          <h3>Как получить токен?</h3>
          <ul className={styles.arr}>
            <p style={{ margin: "0px" }}>
              Это делается через настройки вашего аккаунта на GitHub:
            </p>
            <li>Перейдите в настройки вашего аккаунта.</li>
            <li>
              Найдите раздел <b>"Developer settings"</b>.
            </li>
            <li>
              Раскройте <b>"Personal access tokens"</b>.
            </li>
            <li>
              Во вкладке <b>"Fine-grained tokens"</b> нажмите{" "}
              <b>"Generate new token"</b>
            </li>
          </ul>
        </div>
        <div className={styles.infoAboutMe}>
          <h3 style={{ textAlign: "center" }}>Автор:</h3>
          <p>Черненко Сергей</p>
          <p>Frontend Developer</p>
          <p>tg: @quzzqq</p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
