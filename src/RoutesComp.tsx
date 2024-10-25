import { BrowserRouter, Route, Routes } from "react-router-dom";
import authStore from "./stores/authStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";

const RoutesComp = observer(() => {
  const { token, signIn, logout } = authStore;
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      signIn(userToken);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home token={token} />}></Route>
        <Route
          path="/registration"
          element={<Registration signIn={signIn} token={token} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
});

export default RoutesComp;
