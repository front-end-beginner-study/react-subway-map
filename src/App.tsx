import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import { Navigation } from "./App.styles";
import { PAGE_PATH, privateNavigationLinks, publicNavigationLinks } from "./constants/route";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { checkAccessToken, logout } from "./modules/auth";

const App = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAccessToken());
  }, []);

  const navigationLinks = isLogin ? publicNavigationLinks : privateNavigationLinks;

  const navigationLinkList = navigationLinks.map((navigationLink) => (
    <Link to={navigationLink.link}>
      <Button type="button" buttonTheme="white" kind="rect">
        {navigationLink.title}
      </Button>
    </Link>
  ));

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation>
        {navigationLinkList}
        {isLogin && (
          <Link to={PAGE_PATH.LOGIN}>
            <Button type="button" onClick={onLogout} buttonTheme="white" kind="rect">
              ❌ 로그아웃
            </Button>
          </Link>
        )}
      </Navigation>
      <Switch>
        <Route exact path={PAGE_PATH.LOGIN}>
          <LoginPage />
        </Route>
        <Route exact path={PAGE_PATH.SIGN_UP}>
          <SignupPage />
        </Route>
        <Route exact path={[PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT]}>
          <StationManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.LINE_MANAGEMENT}>
          <LineManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.SECTION_MANAGEMENT}>
          <SectionManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.SUBWAY_MANAGEMENT}>
          <SubwayMapPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
