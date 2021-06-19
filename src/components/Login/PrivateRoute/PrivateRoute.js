import { Redirect, Route } from "react-router-dom";
import Auth from "../../../auth";

const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem("authToken");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token || Auth.isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
