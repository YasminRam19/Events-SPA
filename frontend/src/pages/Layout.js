import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { orange } from "@mui/material/colors";

const RootLayout = () => {
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <LinearProgress />}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
