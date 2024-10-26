import { BrowserRouter, Route, Routes } from "react-router-dom";
import authStore from "./stores/authStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";

const RoutesComp = observer(() => {
  const { token, signIn, logout } = authStore;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      signIn(userToken);
    }
    setLoading(false);
  }, []);
  if (!loading)
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