import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import auth from "../../auth";

const Dashboard = () => {
    // Error state
    const [err, setErr] = useState("");
    // Private data fetched
    const [privateData, setPrivateData] = useState("");
    // Router var
    let history = useHistory();
    // Fetch data
    useEffect(() => {
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            };
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/private",
                    config
                );
                setPrivateData(data.data);
            } catch (err) {
                // Error means the token in the local storage is not valid
                localStorage.removeItem("authToken");
                setErr("You are not authorized please login");
            }
        };

        if (localStorage.getItem("authToken")) fetchPrivateData();
        else if (auth.isAuthenticated()) {
            axios
                .post("http://localhost:5000/home", {
                    withCredentials: true,
                })
                .then((res) => {
                    setPrivateData(res.data);
                })
                .catch((error) => {
                    setErr(error.response);
                });
        } else {
            setErr("Please Login to get Private data");
        }
    }, [privateData]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        axios.get("http://localhost:5000/logout").catch((err) => {
            setErr(err.response);
        });
        history.replace("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {err ? (
                <span className="error">{err}</span>
            ) : (
                <>
                    <div>{privateData}</div>
                    <Button onClick={handleLogout} className="submit-button">
                        Logout
                    </Button>
                </>
            )}
        </div>
    );
};

export default Dashboard;
