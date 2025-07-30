import { useEffect } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { useDispatch } from "react-redux";
import { GetMode } from "./features/Colors/colorsSlice";
import Router from "./Components/Router";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("mode")) {
      if (localStorage.getItem("mode") === "dark") {
        dispatch(GetMode("dark"));
      } else {
        dispatch(GetMode("light"));
      }
    } else {
      localStorage.setItem("mode", "light");
      dispatch(GetMode("light"));
    }
  }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
