import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        },

        body: {
            ClientId: "ApiIntegrationNew",
            UserName: "HARE",
            Password: "HARE@1234",
            LoginType: "2",
            EndUserIp: "103.195.184.237",
        },
    };
    const [hotels, setHotels] = useState(null);

    useEffect(() => {
        fetch(
            "http://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    ClientId: "ApiIntegrationNew",
                    UserName: "HARE",
                    Password: "HARE@1234",
                    LoginType: "2",
                    EndUserIp: "103.195.184.237",
                },
            }
        )
            .then((res) => {
                res.json();
            })
            .then((data) => console.log(data));

        axios
            .post(
                "http://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate",
                options
            )
            .then((data) => console.log(data));
    }, []);
    return (
        <div>
            <h1>This is home</h1>
            <div>{hotels}</div>
        </div>
    );
};

export default Home;
