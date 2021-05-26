import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CurrentAPIName from './components/CurrentAPIName/CurrentAPIName';
import LineManagementPage from './pages/LineManagement/LineManagementPage';
import LoginPage from './pages/Login/LoginPage';
import SectionManagementPage from './pages/SectionManagement/SectionManagementPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import APISelectPage from './pages/APISelect/APISelectPage';
import StationManagementPage from './pages/StationManagement/StationManagementPage';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={APISelectPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/line" component={LineManagementPage} />
        <PrivateRoute path="/section" component={SectionManagementPage} />
        <PrivateRoute path="/station" component={StationManagementPage} />
        {/* <Route path="/search" component={SignUpPage} /> */}
      </Switch>
      <CurrentAPIName />
    </div>
  );
}

export default App;
