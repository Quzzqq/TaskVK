import { useEffect, useState } from "react";
import styles from "./Registration.module.css";
import { Button, TextField } from "@mui/material";
import takeToken from "../../utils/checkToken";
import { useNavigate } from "react-router-dom";

const Registration = ({
  signIn,
  token,
}: {
  signIn: (value: string) => void;
  token: string;
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [mistake, setMistake] = useState<boolean>(false);

  const checkToken = async () => {
    try {
      const response: string = await takeToken(value);
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
      <label className={styles.labelInput} for={styles.fieldToken}>
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
        >
          Отправить
        </Button>
      </div>
      <div className={styles.info}>
        <h3>Как получить токен?</h3>
        <p>Это делается через настройки вашего аккаунта на GitHub:</p>
        <ul className={styles.arr}>
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
    </div>
  );
};

export default Registration;
