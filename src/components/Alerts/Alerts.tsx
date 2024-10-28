import { Alert } from "@mui/material";

export const alertNotFound = () => {
  return (
    <Alert
      severity="error"
      className="alert"
      sx={{ zIndex: 10, position: "fixed", right: "30px", top: "30px" }}
    >
      По вашему запросу ничего не найдено
    </Alert>
  );
};

export const alertManyRequests = () => {
  return (
    <Alert
      severity="error"
      className="alert"
      sx={{ zIndex: 10, position: "fixed", right: "30px", top: "30px" }}
    >
      Слишком много запросов, попробуйте позже
    </Alert>
  );
};
