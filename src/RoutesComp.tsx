import { BrowserRouter, Route, Routes } from "react-router-dom";
import authStore from "./stores/authStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/registration"
            element={<Registration signIn={signIn} />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
});

export default RoutesComp;
