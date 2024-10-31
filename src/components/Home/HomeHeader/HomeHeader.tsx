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
import { languages } from "../../consts/languages";
import { useEffect, useRef, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IFilterState } from "../../../types/filterType";
import { inWhere } from "../../consts/inWhere";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DataStore from "../../../stores/DataStore";

const HomeHeader: React.FC<IFilterState> = ({
  filters,
  setFilters,
  token,
  openHeader,
  setOpenHeader,
  setManyAlerts,
  setFetching,
}) => {
  const [mistake, setMistake] = useState(false);
  const { getDataAction, clearPage } = DataStore;
  const headerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target) &&
      !event.target.classList.contains("MuiSvgIcon-root")
    ) {
      setOpenHeader(false);
    }
  };

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
        clearPage();
        await getDataAction(filters, token);
        setMistake(false);
        setOpenHeader(false);
      } catch (err) {
        if (err.status == 403) {
          setManyAlerts(true);
        }
        console.log(err);
      }
    } else {
      setMistake(true);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTakeData();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={openHeader ? styles.background : ""}>
      <div
        className={`${styles.block} ${openHeader ? styles.open : ""}`}
        ref={headerRef}
      >
        <header>
          <div className={styles.inputArea}>
            <label htmlFor={styles.formLabel}>Код</label>
            <textarea
              data-testid="input"
              className={styles.inputCode}
              onChange={handleChangeInput}
              value={filters.code}
              style={mistake ? { borderColor: "#ec3d3d71" } : {}}
              onKeyDown={handleKeyDown}
              placeholder="Введите необходимый код, который ищете на просторах GitHub"
            />
          </div>
          <div className={styles.filtersArea}>
            <div className={styles.chooseLang}>
              <FormControl
                component="fieldset"
                variant="standard"
                className={styles.FormControl}
              >
                <label className={styles.formLabel}>
                  Язык программирования
                </label>
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
                          checked={filters.languages.includes(value)}
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
              role="button"
            >
              Искать
            </Button>
          </div>
        </header>
        {openHeader ? (
          <KeyboardDoubleArrowUpIcon
            className={styles.close}
            fontSize="large"
            onClick={() => setOpenHeader(false)}
          />
        ) : (
          <KeyboardDoubleArrowDownIcon
            className={styles.close}
            fontSize="large"
            onClick={() => setOpenHeader(true)}
          />
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
