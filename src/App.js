import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar, ServerSelector, Snackbar } from './components/';
import { ROUTE } from './constants';
import {
  Home,
  SignIn,
  SignOut,
  SignUp,
  StationManager,
  LineManager,
  SectionManager,
  Map,
} from './pages';
import { Flex } from './styles';

const Main = styled.main`
  ${Flex({ justify: 'center', items: 'center' })}
  height: calc(100% - 64px);
`;

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Main>
          <Switch>
            <Route exact path={ROUTE.HOME.PATH}>
              <Home />
            </Route>
            <Route exact path={ROUTE.SIGN_IN.PATH}>
              <SignIn />
            </Route>
            <Route exact path={ROUTE.SIGN_OUT.PATH}>
              <SignOut />
            </Route>
            <Route exact path={ROUTE.SIGN_UP.PATH}>
              <SignUp />
            </Route>
            <Route exact path={ROUTE.STATION_MANAGE.PATH}>
              <StationManager />
            </Route>
            <Route exact path={ROUTE.LINE_MANAGE.PATH}>
              <LineManager />
            </Route>
            <Route exact path={ROUTE.SECTION_MANAGE.PATH}>
              <SectionManager />
            </Route>
            <Route exact path={ROUTE.MAP.PATH}>
              <Map />
            </Route>
          </Switch>
        </Main>
        <ServerSelector />
        <Snackbar />
      </Router>
    </>
  );
}

export default App;
