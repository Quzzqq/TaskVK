import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "./HomeHeader.module.css";
import "./HomeHeader.css";
import { languages } from "../../consts/languages";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IFilterState } from "../../../types/filterType";
import { inWhere } from "../../consts/inWhere";
import { takeData } from "../../../service/takeData";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const HomeHeader: React.FC<IFilterState> = ({
  filters,
  setFilters,
  token,
  openHeader,
  setOpenHeader,
}) => {
  const [mistake, setMistake] = useState(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, code: value }));
  };

  const handleChangeLanguages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFilters((prev) =>
      prev.languages.includes(value)
        ? {
            ...prev,
            languages: prev.languages.filter((elem) => elem !== value),
          }
        : { ...prev, languages: [...prev.languages, value] }
    );
  };

  const handleChangeInWhere = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, inWhere: value }));
  };

  const handleTakeData = async () => {
    const text = filters.code.trim();
    if (text.length !== 0) {
      try {
        await takeData(filters, token);
        setMistake(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setMistake(true);
    }
  };

  return (
    <div className={`${styles.block} ${openHeader ? styles.open : ""}`}>
      <header>
        <div className={styles.inputArea}>
          <label htmlFor={styles.formLabel}>Код</label>
          <textarea
            className={styles.inputCode}
            onChange={handleChangeInput}
            value={filters.code}
            style={mistake ? { borderColor: "red" } : {}}
          />
        </div>
        <div className={styles.filtersArea}>
          <div className={styles.chooseLang}>
            <FormControl
              component="fieldset"
              variant="standard"
              className={styles.FormControl}
            >
              <label className={styles.formLabel}>Язык программирования</label>
              <FormGroup
                className={styles.formGroup}
                style={{ flexDirection: "row" }}
              >
                {languages.map((value) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={value}
                        value={value}
                        onChange={handleChangeLanguages}
                      />
                    }
                    key={value}
                    label={value}
                    className={styles.oneLabel}
                    sx={{
                      font: '400 16px "Montserrat"',
                    }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </div>
          <div className={styles.chooseLang}>
            <FormControl>
              <label className={styles.formLabel}>Где искать?</label>
              <RadioGroup
                className={styles.formGroup}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {inWhere.map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio checked={filters.inWhere === value} />}
                    onChange={handleChangeInWhere}
                    label={value}
                    className={styles.oneLabel}
                    sx={{ justifyContent: "center" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="success"
            className={styles.btnFind}
            sx={{ position: "absolute" }}
            onClick={handleTakeData}
          >
            Искать
          </Button>
        </div>
      </header>
      {openHeader ? (
        <KeyboardDoubleArrowUpIcon
          className={styles.close}
          fontSize="large"
          onClick={() => setOpenHeader((prev) => !prev)}
        />
      ) : (
        <KeyboardDoubleArrowDownIcon
          className={styles.close}
          fontSize="large"
          onClick={() => setOpenHeader((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default HomeHeader;
