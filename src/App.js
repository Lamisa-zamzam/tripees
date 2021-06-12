// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Login from "./components/Login/Login/Login.js";
import Register from "./components/Login/Register/Register";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/Login/PasswordReset/PasswordReset";
import Dashboard from "./components/Dashboard/Dashboard";
// Bootstrap Styles
import "bootstrap/dist/css/bootstrap.min.css";
// Private Route
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
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
