import React, { useEffect, useState } from "react";

const Home = () => {
    const [hotels, setHotels] = useState(null);
    useEffect(() => {
        fetch(
            "https://api.tektravels.com/SharedServices/SharedData.svc/rest/Authenticate",
            {
                method: "POST",
                body: {
                    ClientId: "ApiIntegrationNew",
                    UserName: "HARE",
                    Password: "HARE@1234",
                    EndUserIp: "192.168.11.120",
                },
            }
        )
            .then((res) => res.json())
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
