// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Login from "./components/Login/Login/Login.js";
import Register from "./components/Login/Register/Register";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/Login/PasswordReset/PasswordReset";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home.js";
// Bootstrap Styles
import "bootstrap/dist/css/bootstrap.min.css";
// Private Route
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import SignUpOTPUser from "./components/Login/SignUpOTPUser/SignUpOTPUser.js";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/signUpOTPUser" component={SignUpOTPUser} />
                <PrivateRoute path="/forgotPassword">
                    <ForgotPassword />
                </PrivateRoute>
                <PrivateRoute path="/passwordReset/:resetToken">
                    <PasswordReset />
                </PrivateRoute>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};

export default App;
