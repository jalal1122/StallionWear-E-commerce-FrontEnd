import { useEffect } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { GetMode } from "./features/Colors/colorsSlice";

function App() {
  const textColor1 = useSelector((state) => state.colors.colors.textColor1);
  const bgColor1 = useSelector((state) => state.colors.colors.bgColor1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("ColorMode")) {

      if (localStorage.getItem("ColorMode") === "dark") {
        dispatch(GetMode("dark"));
      } else {
        dispatch(GetMode("light"));
      }
      dispatch(GetMode(localStorage.getItem("ColorMode")));
    } else {
      localStorage.setItem("ColorMode", "light");
    }
  }, [dispatch, textColor1, bgColor1]);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
