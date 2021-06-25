import React, { useEffect, useState } from "react";

const Home = () => {
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
    }, []);
    return (
        <div>
            <h1>This is home</h1>
            <div>{hotels}</div>
        </div>
    );
};

export default Home;
