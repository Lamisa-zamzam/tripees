import React, { useEffect, useState } from "react";

const Home = () => {
    const [hotels, setHotels] = useState(null);
    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                EndUserIp: "192.168.10.10",
                TokenId: "c8a3db30-e3aa-4ea9-b962-5e6fcefc9318",
                AdultCount: "1",
                ChildCount: "0",
                InfantCount: "0",
                DirectFlight: "false",
                OneStopFlight: "false",
                JourneyType: "1",
                PreferredAirlines: null,
                Segments: [
                    {
                        Origin: "delhi",
                        Destination: "himachal",
                        FlightCabinClass: "1",
                        PreferredDepartureTime: "2021-06-20 T00: 00: 00",
                        PreferredArrivalTime: "2021-06-20 T00: 00: 00",
                    },
                ],
                Sources: null,
            }),
        };
        fetch("https://api.travelvogues.com/api/SearchFlights", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }, []);
    return (
        <div>
            <h1>This is home</h1>
            <div>{hotels}</div>
        </div>
    );
};

export default Home;
