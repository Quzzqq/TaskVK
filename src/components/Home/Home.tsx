import { useEffect } from "react";
import authStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const Home = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate("/registration");
  });
  return <></>;
};
export default Home;
