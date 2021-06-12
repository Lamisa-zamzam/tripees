import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem("authToken");
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
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
